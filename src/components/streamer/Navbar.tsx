import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
}

export default function Navbar({ activeSection, scrollTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => handleScrollTo("hero")}
          className="font-display text-xl font-bold tracking-widest gradient-text hover:opacity-80 transition-opacity"
        >
          ARTEM MAYBACH
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg
                ${activeSection === item.id
                  ? "text-[var(--neon-cyan)] bg-white/5"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${activeSection === item.id ? "text-[var(--neon-cyan)] bg-white/5" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
