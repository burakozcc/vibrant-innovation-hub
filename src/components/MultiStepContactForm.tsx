import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const MultiStepContactForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.fullName || !formData.email)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !formData.inquiryType) {
      toast({
        title: "Required Field",
        description: "Please select an inquiry type before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) {
      toast({
        title: "Required Field",
        description: "Please enter your message before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          organization_name: "Not specified", // Added to match table schema
          inquiry_type: formData.inquiryType,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "We'll get back to you within 48 hours.",
      });

      setFormData({
        fullName: "",
        email: "",
        inquiryType: "",
        message: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50 focus:border-[#20C997]"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50 focus:border-[#20C997]"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <Select
              value={formData.inquiryType}
              onValueChange={handleInquiryTypeChange}
              required
            >
              <SelectTrigger className="w-full transition-all duration-300 focus:ring-2 
                                      focus:ring-[#20C997]/20 hover:border-[#20C997]/50 focus:border-[#20C997]">
                <SelectValue placeholder="Select purpose of inquiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Collaboration">Collaboration</SelectItem>
                <SelectItem value="General Question">General Question</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
              <Textarea
                name="message"
                placeholder="Your message (max 500 characters)"
                value={formData.message}
                onChange={handleInputChange}
                maxLength={500}
                className="pl-10 min-h-[150px] transition-all duration-300 focus:ring-2 
                          focus:ring-[#20C997]/20 hover:border-[#20C997]/50 focus:border-[#20C997]"
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {500 - formData.message.length} characters left
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#20C997]/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-poppins">
              Let's Build Something Great Together!
            </h2>
            <p className="text-text-secondary mb-8">
              Have questions or want to collaborate? Reach out—we'd love to hear from you!
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full 
                          ${
                            step <= currentStep
                              ? "bg-[#20C997] text-white"
                              : "bg-gray-200 text-gray-400"
                          } transition-all duration-300`}
              >
                {step < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{step}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg relative">
            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="transition-all duration-300 hover:bg-gray-100"
                >
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-[#20C997] hover:bg-[#1BAE87] transition-all duration-300
                            hover:shadow-lg shadow-md flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto bg-[#20C997] hover:bg-[#1BAE87] transition-all duration-300
                            hover:shadow-lg shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center text-text-secondary">
            <p>Or reach us directly at:</p>
            <a
              href="mailto:contact@startovate.com"
              className="text-[#20C997] hover:text-[#1BAE87] transition-colors"
            >
              contact@startovate.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};