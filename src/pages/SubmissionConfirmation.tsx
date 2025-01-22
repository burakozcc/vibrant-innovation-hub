import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

type SubmissionRow = Database["public"]["Tables"]["startup_submissions"]["Row"];

const SubmissionConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const submissionId = (location.state as { submissionId: string })?.submissionId;
  const [status, setStatus] = useState<"submitted" | "under_review" | "accepted" | "declined">("submitted");
  const [checkForm, setCheckForm] = useState({ id: "", email: "" });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!submissionId) return;

    // Initial fetch of submission status
    const fetchSubmissionStatus = async () => {
      const { data, error } = await supabase
        .from("startup_submissions")
        .select("status")
        .eq("id", submissionId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching submission:", error);
        return;
      }

      if (data?.status) {
        setStatus(data.status as typeof status);
      }
    };

    fetchSubmissionStatus();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("submission_updates")
      .on<SubmissionRow>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "startup_submissions",
          filter: `id=eq.${submissionId}`,
        },
        (payload) => {
          if (payload.new && "status" in payload.new) {
            const newStatus = payload.new.status as typeof status;
            setStatus(newStatus);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [submissionId]);

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    try {
      const { data, error } = await supabase
        .from("startup_submissions")
        .select("status")
        .eq("id", checkForm.id)
        .eq("email", checkForm.email)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        navigate("/submission-confirmation", {
          state: { submissionId: checkForm.id, status: data.status }
        });
      } else {
        toast({
          title: "Submission Not Found",
          description: "Please check your Submission ID and email address.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking status:", error);
      toast({
        title: "Error",
        description: "There was an error checking your submission status.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdateSubmission = () => {
    navigate("/", { 
      state: { 
        updateMode: true, 
        submissionId: submissionId 
      } 
    });
  };

  if (!submissionId && !location.state?.fromCheck) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary">
            Thank You for Submitting Your Pitch!
          </h1>
          {submissionId && (
            <Card className="max-w-md mx-auto p-6 border-2 border-primary/20">
              <p className="text-lg font-medium text-text-secondary mb-2">
                Your Submission ID:
              </p>
              <p className="text-2xl font-bold text-primary mb-4">{submissionId}</p>
              <p className="text-sm text-text-secondary">
                Save this ID to track your pitch or make updates later.
              </p>
            </Card>
          )}
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your pitch is now under review. Use your Submission ID to check the status or update your submission.
          </p>
        </div>

        <ProgressTracker status={status} submissionId={submissionId} />

        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          {!submissionId && (
            <form onSubmit={handleCheckStatus} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">
                Check Submission Status
              </h2>
              <Input
                placeholder="Submission ID"
                value={checkForm.id}
                onChange={(e) => setCheckForm(prev => ({ ...prev, id: e.target.value }))}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={checkForm.email}
                onChange={(e) => setCheckForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                disabled={isChecking}
              >
                {isChecking ? "Checking..." : "Check Status"}
              </Button>
            </form>
          )}

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleUpdateSubmission}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Update My Submission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;