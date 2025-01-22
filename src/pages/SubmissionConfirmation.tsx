import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SubmissionRow = Database["public"]["Tables"]["startup_submissions"]["Row"];

const SubmissionConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const submissionId = (location.state as { submissionId: string; verified?: boolean })?.submissionId;
  const isVerified = (location.state as { verified?: boolean })?.verified;
  const [status, setStatus] = useState<"submitted" | "under_review" | "accepted" | "declined">("submitted");

  useEffect(() => {
    if (!submissionId) return;

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

  const handleTrackSubmission = () => {
    navigate("/track-submission");
  };

  const handleUpdateSubmission = () => {
    if (!isVerified) {
      navigate("/track-submission");
      return;
    }
    
    navigate("/update-submission", { 
      state: { 
        submissionId,
        verified: true
      } 
    });
  };

  if (!submissionId) {
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
          <Card className="max-w-md mx-auto p-6 border-2 border-primary/20">
            <p className="text-lg font-medium text-text-secondary mb-2">
              Your Submission ID:
            </p>
            <p className="text-2xl font-bold text-primary mb-4">{submissionId}</p>
            <p className="text-sm text-text-secondary">
              Save this ID to track your pitch or make updates later.
            </p>
          </Card>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your pitch is now under review. Use your Submission ID to check the status or update your submission.
          </p>
        </div>

        <ProgressTracker status={status} submissionId={submissionId} />

        <div className="max-w-md mx-auto space-y-4 animate-fade-in">
          {!isVerified ? (
            <Button
              onClick={handleTrackSubmission}
              className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              <Lock className="w-4 h-4 mr-2" />
              Track My Submission
            </Button>
          ) : (
            <Button
              onClick={handleUpdateSubmission}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Update My Submission
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;