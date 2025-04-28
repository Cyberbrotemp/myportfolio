
import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: "square" | "circle" | "triangle";
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Create initial shapes
    const colors = [
      "rgba(59, 130, 246, 0.3)", // Blue
      "rgba(99, 102, 241, 0.3)", // Indigo
      "rgba(79, 70, 229, 0.3)",  // Violet
      "rgba(139, 92, 246, 0.3)", // Purple
    ];
    
    const types: Shape["type"][] = ["square", "circle", "triangle"];
    const initialShapes: Shape[] = [];
    
    for (let i = 0; i < 15; i++) {
      initialShapes.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100, // percentage of viewport width
        y: Math.random() * 100, // percentage of viewport height
        size: Math.random() * 40 + 10, // between 10px and 50px
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.4 + 0.1, // between 0.1 and 0.5
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.05, // percentage of viewport width per frame
        speedY: (Math.random() - 0.5) * 0.05, // percentage of viewport height per frame
        rotationSpeed: (Math.random() - 0.5) * 0.5, // degrees per frame
      });
    }
    
    setShapes(initialShapes);
    
    // Animation loop
    let animationFrameId: number;
    let lastTimestamp = 0;
    
    const animate = (timestamp: number) => {
      // Limit fps for performance
      if (timestamp - lastTimestamp > 16) { // ~60fps
        lastTimestamp = timestamp;
        
        setShapes((prevShapes) => 
          prevShapes.map((shape) => {
            let newX = shape.x + shape.speedX;
            let newY = shape.y + shape.speedY;
            
            // Bounce off edges
            if (newX < 0 || newX > 100) shape.speedX *= -1;
            if (newY < 0 || newY > 100) shape.speedY *= -1;
            
            // Constrain to viewport
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
            
            return {
              ...shape,
              x: newX,
              y: newY,
              rotation: (shape.rotation + shape.rotationSpeed) % 360,
            };
          })
        );
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape) => {
        const style = {
          left: `${shape.x}%`,
          top: `${shape.y}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          opacity: shape.opacity,
          backgroundColor: shape.type !== "triangle" ? shape.color : "transparent",
          transform: `rotate(${shape.rotation}deg)`,
          transition: "transform 0.5s ease-out",
        };
        
        if (shape.type === "square") {
          return <div key={shape.id} className="absolute rounded" style={style} />;
        } else if (shape.type === "circle") {
          return <div key={shape.id} className="absolute rounded-full" style={style} />;
        } else if (shape.type === "triangle") {
          return (
            <div 
              key={shape.id} 
              className="absolute" 
              style={{
                ...style,
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }} 
            />
          );
        }
        
        return null;
      })}
    </div>
  );
}
