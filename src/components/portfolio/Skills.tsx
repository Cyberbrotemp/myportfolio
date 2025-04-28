
import { useEffect, useRef, useState } from "react";
import { SectionDivider } from "./SectionDivider";
import { Computer, Keyboard, FileType, Database } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  category: "programming" | "technologies" | "tools" | "software" ;
  icon?: React.ReactNode;
}

const skills: Skill[] = [
  // Programming Skills
  { name: "TypeScript", percentage: 55, category: "programming" },
  { name: "Python", percentage: 75, category: "programming" },
  { name: "Javascript", percentage: 50, category: "programming" },
  { name: "HTML/CSS", percentage: 90, category: "programming" },

  // Technologies
  { name: "React", percentage: 40, category: "technologies" },
  { name: "Node.js", percentage: 75, category: "technologies" },
  { name: "My sql", percentage: 100, category: "technologies" },
  { name: "MongoDB", percentage: 50, category: "technologies" },

  // Tools
  { name: "Git", percentage: 75, category: "tools" },
  { name: "Vscodium", percentage: 95, category: "tools" },
  { name: "VS Code", percentage: 90, category: "tools" },
  { name: "Github", percentage: 100, category: "tools" },

  // Software Skills
  { name: "Adobe Photoshop", percentage: 55, category: "software", icon: <Computer className="h-5 w-5" /> },
  { name: "Microsoft Word", percentage: 100, category: "software", icon: <FileType className="h-5 w-5" /> },
  { name: "Microsoft Excel", percentage: 65, category: "software", icon: <Database className="h-5 w-5" /> },
  { name: "Microsoft PowerPoint", percentage: 80, category: "software", icon: <Keyboard className="h-5 w-5" /> },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "programming" | "technologies" | "tools" | "software">("all");

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

  const filteredSkills = filter === "all" 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section id="skills" ref={sectionRef} className="section bg-secondary/30 py-20 relative">
      <div className="absolute top-0 w-full">
        <SectionDivider position="top" color="hsl(var(--background))" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {["all", "programming", "technologies", "tools", "software"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
              onClick={() => setFilter(category as any)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100" : "opacity-0"
              } flex items-center space-x-4`}
            >
              {skill.icon && (
                <div className="bg-primary/10 p-3 rounded-lg">
                  {skill.icon}
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.percentage}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{
                      width: isVisible ? `${skill.percentage}%` : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
