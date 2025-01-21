import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, Clock, FileSearch } from "lucide-react";

type SubmissionStatus = "submitted" | "under_review" | "accepted" | "declined";

interface ProgressTrackerProps {
  status: SubmissionStatus;
  submissionId: string;
}

const statusToProgress = {
  submitted: 33,
  under_review: 66,
  accepted: 100,
  declined: 100,
};

const statusTooltips = {
  submitted: "We've received your pitch and will begin reviewing it shortly.",
  under_review: "Our team is carefully evaluating your pitch.",
  accepted: "Congratulations! We'd like to discuss your pitch further.",
  declined: "Thank you for your submission. Unfortunately, we won't be moving forward.",
};

export const ProgressTracker = ({ status, submissionId }: ProgressTrackerProps) => {
  const progress = statusToProgress[status];
  const isCompleted = (stepProgress: number) => progress >= stepProgress;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">
          Thank you for submitting your pitch!
        </h2>
        <p className="text-text-secondary">
          Here's what happens next (Submission ID: {submissionId}):
        </p>
      </div>

      <Progress value={progress} className="h-3" />

      <div className="flex justify-between mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={`flex flex-col items-center space-y-2 transition-all duration-300
                            ${isCompleted(33) ? 'text-primary' : 'text-gray-400'}`}>
                <div className="p-2 rounded-full bg-background shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Submission Received</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{statusTooltips.submitted}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div className={`flex flex-col items-center space-y-2 transition-all duration-300
                            ${isCompleted(66) ? 'text-primary' : 'text-gray-400'}`}>
                <div className="p-2 rounded-full bg-background shadow-md">
                  <FileSearch className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Under Review</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{statusTooltips.under_review}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div className={`flex flex-col items-center space-y-2 transition-all duration-300
                            ${isCompleted(100) ? 'text-primary' : 'text-gray-400'}`}>
                <div className="p-2 rounded-full bg-background shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Next Steps</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {status === "accepted"
                  ? statusTooltips.accepted
                  : status === "declined"
                  ? statusTooltips.declined
                  : "We'll inform you of our decision soon."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};