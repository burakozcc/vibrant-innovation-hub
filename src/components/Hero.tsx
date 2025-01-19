import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-primary/10">
      <div className="absolute inset-0 bg-[linear-gradient(40deg,rgba(26,188,156,0.1)_0%,rgba(243,156,18,0.1)_100%)]" />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl text-text-primary mb-6 animate-fade-in">
            Startovate: Empowering Türkiye's Brightest Tech Startups
          </h1>
          <p className="font-roboto text-lg md:text-xl text-text-secondary mb-8 animate-slide-up">
            We provide strategic capital and unmatched expertise to help tech startups thrive in Türkiye's growing innovation ecosystem.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-white font-poppins text-lg px-8 py-6 rounded-lg transform transition-all hover:scale-105"
          >
            Pitch Your Startup
          </Button>
        </div>
      </div>
    </section>
  );
};