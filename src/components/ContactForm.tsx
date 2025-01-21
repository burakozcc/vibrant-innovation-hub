import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    ideaSummary: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput.files?.[0];
      let pitchDeckUrl = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('pitch_decks')
          .upload(fileName, file);

        if (uploadError) {
          console.error('File upload error:', uploadError);
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('pitch_decks')
          .getPublicUrl(fileName);

        pitchDeckUrl = publicUrl;
      }

      const { error: submissionError, data: submissionData } = await supabase
        .from('startup_submissions')
        .insert({
          startup_name: formData.startupName,
          industry: formData.industry,
          idea_summary: formData.ideaSummary,
          email: formData.email,
          pitch_deck_url: pitchDeckUrl,
          status: 'submitted'
        })
        .select()
        .single();

      if (submissionError) {
        console.error('Submission error:', submissionError);
        throw new Error(`Submission failed: ${submissionError.message}`);
      }

      // Reset form
      setFormData({
        startupName: "",
        industry: "",
        ideaSummary: "",
        email: "",
      });
      form.reset();

      // Navigate to confirmation page
      navigate('/submission-confirmation', {
        state: {
          submissionId: submissionData.id,
          status: submissionData.status
        }
      });

    } catch (error) {
      console.error('Detailed submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your pitch. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center text-text-primary mb-4">
            Submit Your Startup Pitch
          </h2>
          <p className="text-center text-text-secondary mb-8">
            Tell us about your idea, and let's explore how Startovate can help you grow.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="startupName"
                placeholder="Startup Name"
                value={formData.startupName}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Input
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Textarea
                name="ideaSummary"
                placeholder="Idea Summary"
                value={formData.ideaSummary}
                onChange={handleInputChange}
                className="w-full min-h-[150px] transition-all duration-300 focus:border-[#20C997] 
                          focus:ring-[#20C997]/20 hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50"
                required
              />
            </div>
            <div>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full transition-all duration-300 focus:border-[#20C997] focus:ring-[#20C997]/20
                          hover:border-[#20C997]/50 file:mr-4 file:py-2 file:px-4 file:border-0
                          file:text-sm file:font-semibold file:bg-primary file:text-white
                          hover:file:bg-[#1BAE87]"
              />
              <p className="text-sm text-text-secondary mt-2">
                Optional: Upload your pitch deck (PDF, DOC, DOCX)
              </p>
            </div>
            <p className="text-sm text-text-secondary">
              Your submission will be handled with complete confidentiality.
            </p>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-[#1BAE87] transition-all duration-300
                        hover:shadow-lg shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Pitch"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};