
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Frontend Developer", "CS Student", "Problem Solver", "Python developer" ,"Video Editor"];
  
  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation
    let isMounted = true;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeWriter = () => {
      if (!isMounted) return;
      
      const currentFullText = roles[roleIndex];
      
      if (isDeleting) {
        setTypedText(currentFullText.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        setTypedText(currentFullText.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100; // Normal typing speed
      }
      
      // Switch to deletion mode when word is completed
      if (!isDeleting && charIndex === currentFullText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      } 
      // Switch to next word when deleted
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setCurrentRole(roleIndex);
        typingSpeed = 300; // Pause before typing next word
      }
      
      setTimeout(typeWriter, typingSpeed);
    };
    
    setTimeout(() => {
      if (isMounted) typeWriter();
    }, 1000);
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow" />
      
      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            <span className="block">Hello, I'm</span>
            <span className="block mt-2">Naveen.K</span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="inline-block mr-2">BSc Computer Science Student</span>
            <span className="inline-block">| </span>
            <span className="inline-block text-primary min-w-[120px]">{typedText}</span>
            <span className="animate-pulse ml-0.5">|</span>
          </h2>
          
          <div className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="#about" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              About Me
            </a>
            <a 
              href="https://drive.google.com/file/d/1fb_oJFg2Ib-uzCyXJDz6U1odzO7Ss5Ec/view?usp=sharing" 
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
      
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300 animate-bouncing"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
