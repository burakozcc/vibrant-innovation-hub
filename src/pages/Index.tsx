import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyPartner } from "@/components/WhyPartner";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <WhyPartner />
      <ContactForm />
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-roboto text-text-secondary">
            © 2025 Startovate. Transforming Ideas into Impact.
          </p>
          <p className="font-roboto text-text-secondary mt-2">
            contact@startovate.com.tr
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
