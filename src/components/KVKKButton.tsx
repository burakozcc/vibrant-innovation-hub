import { Shield, ChevronDown, FileText, Share2, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const KVKKButton = () => {
  const handleFormSelection = (formType: string) => {
    // TODO: Implement form navigation/modal logic
    console.log(`Selected form: ${formType}`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-[#20C997] hover:bg-[#1BAE87] transition-all duration-300 transform hover:scale-105 rounded-lg text-base px-6 py-2 font-medium"
              >
                <Shield className="mr-2 h-5 w-5" />
                Access KVKK Compliance Form
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent 
            className="w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg animate-fade-in"
            align="center"
            sideOffset={8}
          >
            <DropdownMenuItem
              className="flex items-center px-4 py-3 hover:bg-[#20C997]/10 cursor-pointer transition-colors duration-200"
              onClick={() => handleFormSelection('general')}
            >
              <FileText className="mr-3 h-5 w-5 text-[#20C997]" />
              <div>
                <p className="font-medium">General KVKK Form</p>
                <p className="text-sm text-gray-500">Basic data protection policy</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center px-4 py-3 hover:bg-[#20C997]/10 cursor-pointer transition-colors duration-200"
              onClick={() => handleFormSelection('retention')}
            >
              <Clock className="mr-3 h-5 w-5 text-[#20C997]" />
              <div>
                <p className="font-medium">Data Retention Policy</p>
                <p className="text-sm text-gray-500">How we store your data</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center px-4 py-3 hover:bg-[#20C997]/10 cursor-pointer transition-colors duration-200"
              onClick={() => handleFormSelection('sharing')}
            >
              <Share2 className="mr-3 h-5 w-5 text-[#20C997]" />
              <div>
                <p className="font-medium">Third-Party Data Sharing</p>
                <p className="text-sm text-gray-500">Data sharing agreements</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent 
          className="max-w-[350px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 text-gray-800 animate-fade-in"
          sideOffset={8}
        >
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-[#20C997] flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Click to access our KVKK compliance forms and learn how we protect your personal data.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};