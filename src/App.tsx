import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubmissionConfirmation from "./pages/SubmissionConfirmation";
import TrackSubmission from "./pages/TrackSubmission";
import UpdateSubmission from "./pages/UpdateSubmission";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submission-confirmation" element={<SubmissionConfirmation />} />
          <Route path="/track-submission" element={<TrackSubmission />} />
          <Route path="/update-submission" element={<UpdateSubmission />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;