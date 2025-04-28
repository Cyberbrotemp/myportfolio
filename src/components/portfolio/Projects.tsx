
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "./SectionDivider";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Student Material Download",
    description: "A full-stack application for managing student records, attendance, and performance. Built with React, Node.js, and MongoDB.",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    tags: ["Html", "Css", "JavaScript"],
    github: "#",
    demo: "#",
  },
  {
    title: "Quantum Build",
    description: "Interactive web application that visualizes various sorting and pathfinding algorithms to help students understand complex algorithms.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
    tags: ["JavaScript(Ajax)", "HTML5", "CSS", "Mysql","Php"],
    github: "#",
    demo: "#",
  },

];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
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

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" ref={sectionRef} className="section bg-secondary/30 py-20 relative">
      <div className="absolute top-0 w-full">
        <SectionDivider position="top" color="hsl(var(--background))" />
      </div>
      <div className="container max-w-5xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          My <span className="text-primary">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className={`project-card overflow-hidden border border-border bg-card transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {project.github && (
                  <a href={project.github} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline"
              className="group"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Projects'} 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
