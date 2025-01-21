import { RocketIcon, LightbulbIcon, GlobeIcon, BookOpen, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const expertiseAreas = [
    {
      icon: <Shield className="w-10 h-10 text-primary transition-all duration-300 group-hover:text-secondary group-hover:scale-110" />,
      title: "Intellectual Property Law",
      description: "I have extensive experience in ensuring that your innovations—whether patents, trademarks, copyrights, or trade secrets—are not only protected but also monetized effectively."
    },
    {
      icon: <LightbulbIcon className="w-10 h-10 text-primary transition-all duration-300 group-hover:text-secondary group-hover:scale-110" />,
      title: "Information Technology Law",
      description: "As an expert in IT law, I provide guidance on compliance, data protection regulations, and technology-related legal frameworks."
    },
    {
      icon: <RocketIcon className="w-10 h-10 text-primary transition-all duration-300 group-hover:text-secondary group-hover:scale-110" />,
      title: "Financial Expertise in IP",
      description: "I understand how to unlock the financial potential of intellectual property through securitization, licensing, or integrating IP into capital markets."
    },
    {
      icon: <GlobeIcon className="w-10 h-10 text-primary transition-all duration-300 group-hover:text-secondary group-hover:scale-110" />,
      title: "Strategic Insights",
      description: "I provide practical, actionable advice tailored to your startup's vision, from refining your pitch to navigating Türkiye's regulatory environment."
    }
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center text-text-primary mb-6">
          Why Partner with Me?
        </h2>
        <p className="text-lg text-text-secondary text-center mb-12 max-w-3xl mx-auto">
          I bring a unique combination of legal, strategic, and financial expertise to help tech startups navigate challenges and achieve success. With a specialized background in Intellectual Property (IP) and Information Technology (IT) law, I am uniquely positioned to guide startups in protecting their innovations and leveraging their intellectual assets for growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index} 
              className={`group border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 
                         ${inView ? 'animate-fade-in opacity-100' : 'opacity-0'}
                         hover:border-primary/20 relative overflow-hidden`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{area.icon}</div>
                <h3 className="font-poppins font-semibold text-xl mb-3">{area.title}</h3>
                <p className="font-roboto text-text-secondary">{area.description}</p>
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,#1ABC9C_1px,transparent_1px)] [background-size:20px_20px]" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-poppins font-semibold mb-4 text-text-primary">
            What I'm Looking For
          </h3>
          <p className="text-lg text-text-secondary mb-8">
            I partner with startups that are ready to make an impact. I'm looking for innovative solutions, strong leadership, and a clear path to scalability. If you're building something transformative, I'm here to help you protect and grow your vision.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-primary hover:bg-[#1BAE87] text-white px-8 py-3 rounded-md font-semibold 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
          >
            Submit Your Pitch
          </button>
        </div>
      </div>
    </section>
  );
};