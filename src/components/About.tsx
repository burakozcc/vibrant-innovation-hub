import { RocketIcon, LightbulbIcon, GlobeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  const features = [
    {
      icon: <LightbulbIcon className="w-10 h-10 text-primary" />,
      title: "Strategic Guidance",
      description: "Grow with insights and expertise tailored to your startup."
    },
    {
      icon: <RocketIcon className="w-10 h-10 text-primary" />,
      title: "Smart Funding",
      description: "Access selective investments that prioritize quality and impact."
    },
    {
      icon: <GlobeIcon className="w-10 h-10 text-primary" />,
      title: "Global Connections",
      description: "Leverage a network of investors, accelerators, and tech leaders."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center text-text-primary mb-12">
          Why Choose Startovate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-poppins font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="font-roboto text-text-secondary">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};