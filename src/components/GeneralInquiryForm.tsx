import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const GeneralInquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organizationName: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          organization_name: formData.organizationName,
          inquiry_type: formData.inquiryType,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "We'll get back to you soon.",
      });

      setFormData({
        fullName: "",
        email: "",
        organizationName: "",
        inquiryType: "",
        message: "",
      });
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

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-text-primary mb-2">
            Let's Collaborate!
          </h2>
          <p className="text-text-secondary mb-8">
            We're excited to hear from you!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Input
                name="organizationName"
                placeholder="Organization/Startup Name"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Select
                value={formData.inquiryType}
                onValueChange={handleInquiryTypeChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Purpose of Inquiry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Collaboration">Collaboration</SelectItem>
                  <SelectItem value="General Question">General Question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full min-h-[150px] transition-all duration-300 focus:border-[#20C997] 
                          focus:ring-[#20C997]/20 hover:border-[#20C997]/50"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#20C997] hover:bg-[#1BAE87] transition-all duration-300
                        hover:shadow-lg shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
          <div className="mt-8 text-text-secondary">
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