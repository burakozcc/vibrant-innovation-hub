import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type SubmissionRow = Database["public"]["Tables"]["startup_submissions"]["Row"];

const SubmissionConfirmation = () => {
  const location = useLocation();
  const submissionId = (location.state as { submissionId: string })?.submissionId;
  const [status, setStatus] = useState<"submitted" | "under_review" | "accepted" | "declined">("submitted");

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

  if (!submissionId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <ProgressTracker status={status} submissionId={submissionId} />
      </div>
    </div>
  );
};

export default SubmissionConfirmation;