
import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { SectionDivider } from "./SectionDivider";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const educationHistory: EducationItem[] = [
  {
    degree: "BSc in Computer Science",
    institution: "Kaamadhenu arts and science college",
    period: "passed-out 2025",
    description: "Focusing on software engineering, algorithms, data structures, computer networks, and artificial intelligence. Maintained a strong GPA throughout the program.",
  },
  {
    degree: "12th standard",
    institution: "Goverment higher secondary school",
    period: "2020 - 2022",
    description: "Graduated with honors in Science and Mathematics. Participated in national programming competitions and various tech clubs.",
  },
  {
    degree: "10th standard",
    institution: "Michealpalayam higer secondary school",
    period: "2015 - 2020",
    description: "Graduated with honors in Science and Mathematics. Participated in national programming competitions and various tech clubs.",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section py-20 relative">
      <div className="absolute top-0 w-full">
        <SectionDivider position="top" color="hsl(var(--secondary) / 0.3)" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          My <span className="text-primary">Education</span>
        </h2>

        <div className="relative pl-8 mt-12 space-y-12 before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-primary/30 before:left-0 ml-4">
          {educationHistory.map((item, index) => (
            <div
              key={index}
              className={`timeline-item pl-8 transition-all duration-700 delay-${index * 200} ${
                isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="timeline-dot"></div>
              <div className="bg-card shadow-md rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{item.period}</span>
                  </div>
                </div>
                <div className="text-primary font-medium mb-3">{item.institution}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
