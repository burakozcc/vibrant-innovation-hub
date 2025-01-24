import { Button } from "@/components/ui/button";
import { CircleIcon, FileText, Users, CalendarCheck, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Submit your pitch",
    description: "Share your innovative idea and vision with our team through our simple submission form.",
    icon: FileText,
  },
  {
    title: "Review and shortlisting",
    description: "Our experts carefully evaluate your pitch based on innovation, market potential, and team capability.",
    icon: Users,
  },
  {
    title: "Initial meeting with our team",
    description: "Selected startups meet with our investment team to discuss their vision in detail.",
    icon: CalendarCheck,
  },
  {
    title: "Final decision and onboarding",
    description: "Successful startups receive investment offers and begin their journey with Startovate.",
    icon: Rocket,
  },
];

export const ApplicationProcess = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-text-primary">
          Our Application Process
        </h2>
        
        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-8 relative">
          {/* Connection Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#1ABC9C]/20" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              {/* Step Number Circle */}
              <div className="w-24 h-24 rounded-full bg-[#1ABC9C] flex items-center justify-center mb-6 relative z-10">
                <step.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="w-16 h-16 rounded-full bg-[#1ABC9C] flex-shrink-0 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-white" />
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

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="bg-white text-[#1ABC9C] border-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors"
            asChild
          >
            <Link to="/process">
              Learn More About Our Process
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};