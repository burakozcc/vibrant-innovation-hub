import { Button } from "@/components/ui/button";
import { FileText, Search, Users, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Submit your pitch",
    description: "Share your innovative idea and vision with our team through our simple submission form.",
    icon: FileText,
    hoverEffect: "hover:rotate-12 transition-transform duration-300",
  },
  {
    title: "Review and shortlisting",
    description: "Our experts carefully evaluate your pitch based on innovation, market potential, and team capability.",
    icon: Search,
    hoverEffect: "hover:scale-110 transition-transform duration-300",
  },
  {
    title: "Initial meeting with our team",
    description: "Selected startups meet with our investment team to discuss their vision in detail.",
    icon: Users,
    hoverEffect: "hover:translate-y-[-4px] transition-transform duration-300",
  },
  {
    title: "Final decision and onboarding",
    description: "Successful startups receive investment offers and begin their journey with Startovate.",
    icon: Rocket,
    hoverEffect: "hover:translate-x-2 transition-transform duration-300",
  },
];

export const ApplicationProcess = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4 animate-fade-in">
            Your Path to Success Starts Here!
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join Türkiye's most innovative startups on their journey to success
          </p>
        </div>
        
        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:block relative mb-16">
          <div className="absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#1ABC9C]/20 via-[#20C997]/40 to-[#FFD700]/20" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center ${
                  inView ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <div
                      className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#1ABC9C] to-[#20C997] 
                        flex items-center justify-center cursor-pointer relative z-10 
                        shadow-lg group ${step.hoverEffect}`}
                    >
                      <step.icon className="w-16 h-16 text-white transition-transform duration-300" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4 bg-white shadow-xl border-none">
                    <h3 className="text-xl font-semibold mb-2 text-[#1ABC9C]">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">
                      {step.description}
                    </p>
                  </HoverCardContent>
                </HoverCard>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-[#1ABC9C] to-[#20C997] 
                flex-shrink-0 flex items-center justify-center shadow-md ${step.hoverEffect}`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${inView ? "animate-fade-in" : "opacity-0"}`} 
             style={{ animationDelay: "600ms" }}>
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            Ready to Start? Submit Your Pitch Now!
          </h3>
          <Button
            className="bg-[#20C997] hover:bg-[#1ABC9C] text-white px-8 py-6 text-lg rounded-lg
              transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <Link to="/process">
              Start Your Journey
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};