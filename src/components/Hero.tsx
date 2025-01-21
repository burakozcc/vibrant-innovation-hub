import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/backgroundvideo.mp4" type="video/mp4" />
        </video>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl text-white mb-6 animate-fade-in drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
            Startovate: Empowering Türkiye's Brightest Tech Startups
          </h1>
          <p className="font-roboto text-lg md:text-xl text-white/90 mb-8 animate-slide-up">
            We provide strategic capital and unmatched expertise to help tech startups thrive in Türkiye's growing innovation ecosystem.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-primary hover:bg-[#1BAE87] text-white font-poppins text-lg px-8 py-6 rounded-lg 
                     transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                     animate-fade-in shadow-md hover:shadow-primary/20"
          >
            Pitch Your Startup
          </Button>
        </div>
      </div>
    </section>
  );
};