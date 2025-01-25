import { Shield } from "lucide-react";
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
        <TooltipContent className="max-w-[300px] text-center p-3">
          <p>Click here to view our compliance with the Law on Protection of Personal Data (KVKK)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};