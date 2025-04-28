
import { useEffect, useRef, useState } from "react";

interface SectionDividerProps {
  position?: "top" | "bottom" | "both";
  color?: string;
  height?: number;
  invert?: boolean;
}

export function SectionDivider({ 
  position = "bottom", 
  color = "currentColor", 
  height = 70,
  invert = false 
}: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, []);

  // Generate wave pattern
  const generateWavePath = (invert: boolean) => {
    const amplitude = height / 2;
    const frequency = 4;
    
    let points = "";
    const segments = 10;
    
    if (invert) {
      points += `M0,0 L0,${height} `;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * 100;
        const y = amplitude * Math.sin((x / 100) * Math.PI * frequency);
        points += `L${x},${y + amplitude} `;
      }
      points += `L100,${height} L100,0 Z`;
    } else {
      points += `M0,${height} `;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * 100;
        const y = amplitude * Math.sin((x / 100) * Math.PI * frequency);
        points += `L${x},${y + amplitude} `;
      }
      points += `L100,${height} Z`;
    }
    
    return points;
  };

  return (
    <div 
      ref={dividerRef} 
      className={`w-full overflow-hidden transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: `${height}px` }}
    >
      {(position === "top" || position === "both") && (
        <svg
          className="w-full h-full transform rotate-180 absolute top-0 left-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill={color}
        >
          <path d={generateWavePath(!invert)} />
        </svg>
      )}
      
      {(position === "bottom" || position === "both") && (
        <svg
          className="w-full h-full absolute bottom-0 left-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill={color}
        >
          <path d={generateWavePath(invert)} />
        </svg>
      )}
    </div>
  );
}
