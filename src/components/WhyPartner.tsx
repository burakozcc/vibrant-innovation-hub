import { Shield, Scale, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhyPartner = () => {
  const expertiseAreas = [
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Intellectual Property Law",
      description: "I ensure your innovations are protected and monetized effectively, from licensing agreements to managing complex IP portfolios."
    },
    {
      icon: <Scale className="w-10 h-10 text-primary" />,
      title: "Information Technology Law",
      description: "I provide guidance on compliance, data protection regulations, and building legally sound tech platforms."
    },
    {
      icon: <BarChart className="w-10 h-10 text-primary" />,
      title: "Financial Expertise in IP",
      description: "I specialize in unlocking the financial potential of intellectual property through securitization, licensing, and integrating IP into capital markets."
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center text-text-primary mb-4">
          Why Partner with Me?
        </h2>
        <p className="text-lg text-text-secondary text-center mb-12 max-w-3xl mx-auto">
          I bring a unique blend of legal, strategic, and financial expertise to help your startup navigate the complex landscape of technology and intellectual property.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {expertiseAreas.map((area, index) => (
            <div 
              key={index}
              className="p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 flex justify-center">{area.icon}</div>
              <h3 className="font-poppins font-semibold text-xl mb-3 text-center">
                {area.title}
              </h3>
              <p className="font-roboto text-text-secondary text-center">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
            I offer tailored advice to refine your pitch, negotiate contracts, and navigate Türkiye's regulatory environment.
          </p>
          <p className="text-lg font-semibold text-text-primary mb-8">
            If you're ready to show how your startup can make an impact, submit your pitch and let's talk about your vision.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg"
          >
            Submit Your Pitch
          </Button>
        </div>
      </div>
    </section>
  );
};