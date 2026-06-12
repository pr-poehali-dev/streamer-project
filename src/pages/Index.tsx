import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/components/streamer/data";
import Navbar from "@/components/streamer/Navbar";
import HeroSection from "@/components/streamer/HeroSection";
import StreamerSections from "@/components/streamer/StreamerSections";

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <StreamerSections scrollTo={scrollTo} />
    </div>
  );
}
