import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

interface ContactFormProps {
  initialData?: any;
  isUpdateMode?: boolean;
  submissionId?: string;
}

export const ContactForm = ({ initialData, isUpdateMode, submissionId }: ContactFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    ideaSummary: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        startupName: initialData.startup_name || "",
        industry: initialData.industry || "",
        ideaSummary: initialData.idea_summary || "",
        email: initialData.email || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      let pitchDeckUrl = initialData?.pitch_deck_url || null;

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

      if (isUpdateMode && submissionId) {
        const { error: updateError } = await supabase
          .from('startup_submissions')
          .update({
            startup_name: formData.startupName,
            industry: formData.industry,
            idea_summary: formData.ideaSummary,
            email: formData.email,
            pitch_deck_url: pitchDeckUrl,
          })
          .eq('id', submissionId);

        if (updateError) throw updateError;

        toast({
          title: "Success",
          description: "Your submission has been updated successfully.",
        });

        navigate('/submission-confirmation', {
          state: {
            submissionId,
            status: 'submitted',
            verified: true
          }
        });
      } else {
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

        if (submissionError) throw submissionError;

        setFormData({
          startupName: "",
          industry: "",
          ideaSummary: "",
          email: "",
        });
        form.reset();

        navigate('/submission-confirmation', {
          state: {
            submissionId: submissionData.id,
            status: submissionData.status
          }
        });
      }
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
            {isUpdateMode ? "Update Your Startup Pitch" : "Submit Your Startup Pitch"}
          </h2>
          <p className="text-center text-text-secondary mb-8">
            {isUpdateMode 
              ? "Update your pitch details below"
              : "Tell us about your idea, and let's explore how Startovate can help you grow."}
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
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <label 
                  className="relative inline-flex items-center px-4 py-2 bg-primary hover:bg-[#1BAE87] 
                            text-white rounded-lg cursor-pointer transition-all duration-300 
                            hover:shadow-lg shadow-md h-10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Dosya Seç
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
                {selectedFileName && (
                  <span className="text-sm text-text-secondary truncate">
                    {selectedFileName}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary">
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
              {isSubmitting 
                ? (isUpdateMode ? "Updating..." : "Submitting...") 
                : (isUpdateMode ? "Update Pitch" : "Submit Pitch")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};