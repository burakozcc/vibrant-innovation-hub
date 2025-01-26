import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { MultiStepContactForm } from "@/components/MultiStepContactForm";
import { KVKKButton } from "@/components/KVKKButton";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Add network lines animation
    const createNetworkLines = () => {
      const container = document.createElement('div');
      container.className = 'network-lines';
      
      // Create SVG paths for network effect
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      // Add multiple paths for network effect
      for (let i = 0; i < 5; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'network-line');
        path.setAttribute('d', `M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`);
        svg.appendChild(path);
      }
      
      container.appendChild(svg);
      document.body.appendChild(container);
    };

    createNetworkLines();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <div className="section-divider" />
      
      <div className="parallax-bg">
        <About />
      </div>
      
      <div className="section-divider section-glow" />
      
      <div className="relative bg-gradient-to-b from-white to-background">
        <ContactForm />
      </div>
      
      <div className="section-divider" />
      
      <div className="parallax-bg bg-white">
        <MultiStepContactForm />
      </div>
      
      <footer className="bg-white py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 space-y-6 relative z-10">
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
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </footer>
    </div>
  );
};

export default Index;