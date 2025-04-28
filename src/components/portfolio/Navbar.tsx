
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl md:text-2xl font-bold text-primary">
            Portfolio
          </a>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300"
            >
              Let's Talk
            </a>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <a href="#home" className="text-xl font-bold text-primary">
            Portfolio
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-2 text-xl text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="mt-4 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 text-center"
            onClick={closeMenu}
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  );
}
