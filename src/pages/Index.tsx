import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { ApplicationProcess } from "@/components/ApplicationProcess";
import { MultiStepContactForm } from "@/components/MultiStepContactForm";
import { KVKKButton } from "@/components/KVKKButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <ApplicationProcess />
      <ContactForm />
      <MultiStepContactForm />
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-text-secondary">
              We value your privacy. Access our KVKK compliance form to understand how we protect your data.
            </p>
            <KVKKButton />
          </div>
          <div className="text-center">
            <p className="font-roboto text-text-secondary">
              © 2025 Startovate. Transforming Ideas into Impact.
            </p>
            <p className="font-roboto text-text-secondary mt-2">
              contact@startovate.com.tr
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;