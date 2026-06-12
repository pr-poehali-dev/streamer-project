import Icon from "@/components/ui/icon";
import { HERO_BG, SOCIALS } from "./data";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              background: i % 2 === 0 ? "var(--neon-purple)" : "var(--neon-cyan)",
              left: `${10 + i * 15}%`,
              top: `${20 + (i * 13) % 50}%`,
              animationDelay: `${i * 0.7}s`,
              filter: "blur(6px)"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border mb-8 live-badge">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-widest text-white/80 uppercase">Live сейчас</span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 animate-fade-in-up">
          <span className="gradient-text animate-neon-flicker">ARTEM MAYBACH</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 tracking-widest font-light mb-10 animate-fade-in-up delay-200">
          LIVE GAMING · СТРИМЫ · CONTENT CREATOR
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-400">
          <button
            onClick={() => scrollTo("schedule")}
            className="px-8 py-3.5 rounded-xl font-display font-semibold tracking-wider text-sm
              bg-gradient-to-r from-purple-600 to-purple-500 text-white
              hover:from-purple-500 hover:to-purple-400 transition-all duration-300
              hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            РАСПИСАНИЕ СТРИМОВ
          </button>
          <button
            onClick={() => scrollTo("donate")}
            className="px-8 py-3.5 rounded-xl font-display font-semibold tracking-wider text-sm
              glass neon-border text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            ПОДДЕРЖАТЬ
          </button>
        </div>

        <div className="flex gap-5 justify-center mt-12 animate-fade-in-up delay-600">
          {SOCIALS.map(s => (
            <a
              key={s.name}
              href={s.url}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
              title={s.name}
            >
              <Icon name={s.icon} size={18} fallback="Link" />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <Icon name="ChevronDown" size={24} className="text-white/30" />
      </div>
    </section>
  );
}
