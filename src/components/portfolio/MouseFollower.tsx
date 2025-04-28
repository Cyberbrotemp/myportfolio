
import { useEffect, useState } from "react";

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (typeof window === "undefined") return null;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) return null;

  return (
    <>
      <div
        className={`fixed z-[9999] pointer-events-none transition-transform duration-100 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-50" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative">
          <div
            className={`absolute rounded-full mix-blend-difference ${
              clicked ? "w-6 h-6 bg-white" : "w-8 h-8 border-2 border-white"
            } transition-all duration-200 ease-out`}
          />
        </div>
      </div>
    </>
  );
}
