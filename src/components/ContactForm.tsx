import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission Received",
      description: "Thank you for your interest. We'll review your submission and get back to you soon.",
    });
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
              <Input placeholder="Startup Name" className="w-full" required />
            </div>
            <div>
              <Input placeholder="Industry" className="w-full" required />
            </div>
            <div>
              <Textarea placeholder="Idea Summary" className="w-full min-h-[150px]" required />
            </div>
            <div>
              <Input type="email" placeholder="Email Address" className="w-full" required />
            </div>
            <div>
              <Input type="file" accept=".pdf,.doc,.docx" className="w-full" />
              <p className="text-sm text-text-secondary mt-2">Optional: Upload your pitch deck (PDF, DOC, DOCX)</p>
            </div>
            <p className="text-sm text-text-secondary">
              Your submission will be handled with complete confidentiality.
            </p>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Submit Pitch
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};