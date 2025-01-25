import { Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const KVKKButton = () => {
  const handleKVKKClick = () => {
    // TODO: Implement KVKK form modal or navigation
    console.log("KVKK button clicked");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleKVKKClick}
            className="bg-[#20C997] hover:bg-[#1BAE87] transition-all duration-300 transform hover:scale-105 rounded-lg text-base px-6 py-2 font-medium"
          >
            <Shield className="mr-2 h-5 w-5" />
            Access KVKK Compliance Form
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[350px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 text-gray-800 animate-fade-in"
          sideOffset={8}
        >
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-[#20C997] flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Learn how we protect your personal data in compliance with the Law on Protection of Personal Data (KVKK). Click to view and complete the form.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};