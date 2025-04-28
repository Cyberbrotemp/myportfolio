
import { useEffect, useRef, useState } from "react";
import { Mouse, Award, Trophy, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionDivider } from "./SectionDivider";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: "award" | "trophy" | "medal";
}

export const certifications = [
  {
    title: "AI For All Introduction",
    issuer: "Digital India",
    date: "2025",
    icon: "award"
  },
  {
    title: "Cyber Security",
    issuer: "IBMSkillsBuild",
    date: "2025",
    icon: "trophy"
  }
];


export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const IconComponent = (iconName: "award" | "trophy" | "medal") => {
    switch (iconName) {
      case "award":
        return <Award className="w-6 h-6" />;
      case "trophy":
        return <Trophy className="w-6 h-6" />;
      case "medal":
        return <Medal className="w-6 h-6" />;
    }
  };

  return (
    <section id="certifications" ref={sectionRef} className="section bg-secondary/30 py-20 relative">
      <div className="absolute top-0 w-full">
        <SectionDivider position="top" color="hsl(var(--background))" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          My <span className="text-primary">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className={`transition-all duration-700 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } hover:shadow-lg group`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {IconComponent(cert.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              </CardContent>
            </Card>
          ))}

          {/* Floating mouse icons */}
          {[1, 2, 3].map((_, i) => (
            <Mouse
              key={i}
              className={`absolute text-primary/20 w-8 h-8 pointer-events-none transition-all duration-300
                ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `translate(${Math.sin((Date.now() + i * 1000) / 1000) * 20}px, ${
                  Math.cos((Date.now() + i * 1000) / 1000) * 20
                }px)`,
                top: `${20 + i * 30}%`,
                left: `${20 + i * 30}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
