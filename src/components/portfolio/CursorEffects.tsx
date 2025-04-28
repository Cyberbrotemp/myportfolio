
import { useEffect } from "react";

export function CursorEffects() {
  useEffect(() => {
    // Add interactive hover effects for specific elements
    const addInteractiveEffects = () => {
      const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-bar');
      
      const onMouseEnter = (e: Event) => {
        const cursor = document.querySelector('.cursor-follower') as HTMLElement;
        if (cursor) {
          cursor.classList.add('cursor-hover');
        }
        
        const target = e.currentTarget as HTMLElement;
        target.classList.add('element-hover');
      };
      
      const onMouseLeave = (e: Event) => {
        const cursor = document.querySelector('.cursor-follower') as HTMLElement;
        if (cursor) {
          cursor.classList.remove('cursor-hover');
        }
        
        const target = e.currentTarget as HTMLElement;
        target.classList.remove('element-hover');
      };
      
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
      
      return () => {
        hoverElements.forEach(el => {
          el.removeEventListener('mouseenter', onMouseEnter);
          el.removeEventListener('mouseleave', onMouseLeave);
        });
      };
    };
    
    // Add scroll animations
    const addScrollAnimations = () => {
      const onScroll = () => {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('#home') as HTMLElement;
        if (heroSection) {
          const heroContent = heroSection.querySelector('.container') as HTMLElement;
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
          }
        }
        
        // Apply additional scroll-based animations
        const animateOnScroll = document.querySelectorAll('.scroll-animate:not(.animated)');
        animateOnScroll.forEach((el) => {
          const element = el as HTMLElement;
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight * 0.75) {
            element.classList.add('animated');
          }
        });
      };
      
      window.addEventListener('scroll', onScroll);
      
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    };
    
    const cleanup1 = addInteractiveEffects();
    const cleanup2 = addScrollAnimations();
    
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);
  
  return null;
}
