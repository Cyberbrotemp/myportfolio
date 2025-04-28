
import { useEffect } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { FloatingShapes } from "@/components/portfolio/FloatingShapes";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { BackgroundParticles } from "@/components/portfolio/BackgroundParticles";
import { MouseFollower } from "@/components/portfolio/MouseFollower";
import { MobileDetector } from "@/components/portfolio/MobileDetector";
import { CursorEffects } from "@/components/portfolio/CursorEffects";

const Index = () => {
  useEffect(() => {
    // For scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <BackgroundParticles />
      <MouseFollower />
      <MobileDetector />
      <CursorEffects />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
