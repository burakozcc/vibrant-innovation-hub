import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const UpdateSubmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const submissionId = location.state?.submissionId;
  const verified = location.state?.verified;

  useEffect(() => {
    const fetchSubmissionData = async () => {
      if (!submissionId || !verified) {
        navigate("/track-submission");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("startup_submissions")
          .select("*")
          .eq("id", submissionId)
          .single();

        if (error) throw error;
        setSubmissionData(data);
      } catch (error) {
        console.error("Error fetching submission:", error);
        toast({
          title: "Error",
          description: "Failed to fetch submission data. Please try again.",
          variant: "destructive",
        });
        navigate("/track-submission");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissionData();
  }, [submissionId, verified, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Your Submission
          </h1>
          <ContactForm
            initialData={submissionData}
            isUpdateMode={true}
            submissionId={submissionId}
          />
        </Card>
      </div>
    </div>
  );
};

export default UpdateSubmission;