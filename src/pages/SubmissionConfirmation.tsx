import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface LocationState {
  submissionId: string;
  status: "submitted" | "under_review" | "accepted" | "declined";
}

type SubmissionRow = Database["public"]["Tables"]["startup_submissions"]["Row"];

const SubmissionConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<LocationState["status"]>(
    (location.state as LocationState)?.status || "submitted"
  );
  const submissionId = (location.state as LocationState)?.submissionId;

  useEffect(() => {
    if (!submissionId) return;

    const channel = supabase
      .channel("submission_updates")
      .on<SubmissionRow>(
        'postgres_changes',
        {
          event: "*",
          schema: "public",
          table: "startup_submissions",
          filter: `id=eq.${submissionId}`,
        },
        (payload: RealtimePostgresChangesPayload<SubmissionRow>) => {
          const newStatus = payload.new?.status;
          if (
            newStatus &&
            (newStatus === "submitted" ||
              newStatus === "under_review" ||
              newStatus === "accepted" ||
              newStatus === "declined")
          ) {
            setStatus(newStatus as LocationState["status"]);
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
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-[#1BAE87] transition-all duration-300"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;