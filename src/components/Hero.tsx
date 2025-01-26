import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        {/* Semi-transparent overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 
            className={`font-poppins font-bold text-4xl md:text-6xl text-white mb-6 
                       transition-all duration-1000 ease-out transform
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                       drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]`}
          >
            Startovate: Empowering Türkiye's Brightest Tech Startups
          </h1>
          
          <p 
            className={`font-roboto text-lg md:text-xl text-white/90 mb-8
                       transition-all duration-1000 delay-300 ease-out transform
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Fueling innovation for startups in Türkiye and those targeting its vibrant market
          </p>
          
          <Button 
            onClick={scrollToContact}
            className={`bg-gradient-to-r from-[#20C997] to-[#1ABC9C] hover:from-[#1BAE87] hover:to-[#169C82]
                       text-white font-poppins text-lg px-8 py-6 rounded-lg 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                       shadow-md hover:shadow-primary/20
                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            Pitch Your Startup
          </Button>
        </div>
      </div>
    </section>
  );
};