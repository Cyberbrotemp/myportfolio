
import { useEffect, useRef, useState } from "react";
import { Code, GraduationCap, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
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
    <section id="about" ref={sectionRef} className="section bg-background py-20 relative">
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-4">
              I'm a passionate Computer Science student with a strong interest in software development, algorithms, and problem-solving. 
              Currently pursuing my BSc in Computer Science, I'm dedicated to expanding my technical knowledge and building innovative solutions.
            </p>
            <p className="text-muted-foreground">
              My academic journey has equipped me with a solid foundation in programming principles, data structures, and software engineering methodologies.
              I enjoy tackling complex problems and continuously learning new technologies.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`}>
<img
  src="https://i.ibb.co/jGkNMZ8/IMG-20230124-WA0001.jpg"
  alt="Computer Science Student"
  className="w-64 h-64 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
/>




          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <User className="h-10 w-10 text-primary" />,
              title: "Personal",
              description: "Passionate about learning new technologies and solving complex problems with elegant solutions.",
              delay: "delay-100",
            },
            {
              icon: <GraduationCap className="h-10 w-10 text-primary" />,
              title: "Education",
              description: "BSc in Computer Science with focus on software engineering, algorithms, and data structures.",
              delay: "delay-300",
            },
            {
              icon: <Code className="h-10 w-10 text-primary" />,
              title: "Technical",
              description: "Proficient in several programming languages including JavaScript, Python, and Java with experience in web development.",
              delay: "delay-500",
            },
          ].map((item, index) => (
            <Card key={index} className={`border border-border shadow-sm transition-all duration-700 ${item.delay} ${isVisible ? 'animate-scale' : 'opacity-0'}`}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
