
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (2 + Math.random() * 8);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);
    
    // Handle completion
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      
      // Allow time for exit animation
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 500);
    }, 2500);
    
    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, []);
  
  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary animate-pulse">
      Naveen.K  Portfolio
      </h1>
      
      <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-muted-foreground">
        Loading... {Math.round(progress)}%
      </p>
    </div>
  );
}
