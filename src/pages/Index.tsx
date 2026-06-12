import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/ead7bd32-5df8-4649-aad8-a70cc0c0aac4/files/9b10a2a4-831e-44cb-ab72-c933d5b7e822.jpg";

const SCHEDULE = [
  { day: "Понедельник", time: "21:00", game: "Общение", type: "чат", live: false },
  { day: "Вторник", time: "21:00", game: "Euro Truck Simulator 2", type: "симулятор", live: false },
  { day: "Среда", time: "21:00", game: "Общение", type: "чат", live: false },
  { day: "Четверг", time: "21:00", game: "AMAZING RP", type: "roleplay", live: false },
  { day: "Пятница", time: "21:00", game: "Общение", type: "чат", live: true },
  { day: "Суббота", time: "21:00", game: "Counter-Strike 2", type: "шутер", live: false },
  { day: "Воскресенье", time: "—", game: "—", type: "выходной", live: false },
];

const DONORS = [
  { name: "KINGHERO", amount: 12400, avatar: "👑" },
  { name: "NightWatcher", amount: 8750, avatar: "🌙" },
  { name: "FireStorm99", amount: 6200, avatar: "🔥" },
  { name: "CryptoWolf", amount: 4100, avatar: "🐺" },
  { name: "SilentBlade", amount: 3300, avatar: "⚔️" },
  { name: "PurpleRain", amount: 2800, avatar: "💜" },
  { name: "DarkMatter", amount: 1950, avatar: "🌌" },
  { name: "StormBreaker", amount: 1200, avatar: "⚡" },
];

const GALLERY = [
  { title: "Победа в турнире", desc: "Финал зимнего сезона 2024", emoji: "🏆" },
  { title: "Рекордный стрим", desc: "12 часов без остановки", emoji: "⚡" },
  { title: "5000 зрителей", desc: "Лучший момент этого года", emoji: "👁️" },
  { title: "Перфектный тимфайт", desc: "5 убийств за 3 секунды", emoji: "💥" },
  { title: "Стрим с фанатами", desc: "100 участников в одной игре", emoji: "🎮" },
  { title: "Коллаборация", desc: "Гостевой стрим с топ-10 СНГ", emoji: "🤝" },
];

const SOCIALS = [
  { name: "Twitch", icon: "Tv", url: "#", color: "#9147ff", label: "Смотреть стримы" },
  { name: "YouTube", icon: "Youtube", url: "#", color: "#ff0000", label: "Записи и хайлайты" },
  { name: "VK", icon: "MessageCircle", url: "#", color: "#0077ff", label: "Новости и анонсы" },
  { name: "Telegram", icon: "Send", url: "#", color: "#22d3ee", label: "Чат и обновления" },
];

const NAV_ITEMS = [
  { id: "hero", label: "Главная" },
  { id: "about", label: "О стримере" },
  { id: "schedule", label: "Расписание" },
  { id: "gallery", label: "Галерея" },
  { id: "donate", label: "Донат" },
  { id: "leaderboard", label: "Топ донатеров" },
];

function useIntersect(ref: React.RefObject<Element>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersect(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(100);
  const [donateMsg, setDonateMsg] = useState("");

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
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-xl font-bold tracking-widest gradient-text hover:opacity-80 transition-opacity"
          >
            СТРИМЕР
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
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
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeSection === item.id ? "text-[var(--neon-cyan)] bg-white/5" : "text-white/60 hover:text-white hover:bg-white/5"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
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
            <span className="gradient-text animate-neon-flicker">СТРИМЕР</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 tracking-widest font-light mb-10 animate-fade-in-up delay-200">
            DOTA 2 · LIVE GAMING · CONTENT CREATOR
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 space-y-32">

        {/* О СТРИМЕРЕ */}
        <Section id="about" className="pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">О стримере</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Dota 2 игрок<br />
                <span className="gradient-text">с 2013 года</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Привет! Я стримлю Dota 2 уже больше 10 лет. Начинал как простой игрок, а сейчас собрал сообщество настоящих ценителей игры. Каждый стрим — это не просто геймплей, это атмосфера, анализ и общение с лучшими зрителями.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Моё максимальное звание — <span className="text-[var(--neon-cyan)] font-semibold">Divine 5</span>. Стримлю ranked-игры, турниры и стримы с подписчиками — заходи, будем играть вместе!
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10+", label: "лет в Dota" },
                  { value: "50К+", label: "подписчиков" },
                  { value: "Divine 5", label: "рейтинг" },
                ].map(stat => (
                  <div key={stat.label} className="glass neon-border rounded-xl p-4 text-center">
                    <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl glass neon-border overflow-hidden flex items-center justify-center relative">
                <div className="text-center z-10">
                  <div className="text-8xl mb-4">🎮</div>
                  <p className="text-white/30 text-sm">Фото стримера</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass neon-border rounded-xl px-5 py-3 animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-display text-sm font-semibold text-white">В эфире!</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* РАСПИСАНИЕ */}
        <Section id="schedule">
          <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">Когда стримить</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">
            Расписание <span className="gradient-text">стримов</span>
          </h2>

          <div className="space-y-3">
            {SCHEDULE.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6
                  glass rounded-xl px-6 py-4 border transition-all duration-300
                  ${item.live
                    ? "border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/5 hover:border-[var(--neon-cyan)]/60"
                    : "border-white/5 hover:border-purple-500/30"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.live ? "bg-[var(--neon-cyan)] animate-pulse" : "bg-white/20"}`} />
                  <span className="font-display text-lg font-semibold text-white tracking-wide">{item.day}</span>
                  {item.live && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold tracking-widest uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                      LIVE
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 ml-6 sm:ml-0">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Icon name="Clock" size={14} />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Icon name="Gamepad2" size={14} />
                    <span>{item.game}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium
                    ${item.type === "турнир"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : item.type === "стрим с подписчиками"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "bg-white/5 text-white/40 border border-white/10"
                    }`}>
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ГАЛЕРЕЯ */}
        <Section id="gallery">
          <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">Лучшие моменты</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">
            Галерея <span className="gradient-text">стримов</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="group glass neon-border rounded-2xl overflow-hidden aspect-video flex items-end p-5 cursor-pointer
                  hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20 group-hover:opacity-40 transition-all duration-300 group-hover:scale-110 select-none">
                    {item.emoji}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-white/40 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ДОНАТ */}
        <Section id="donate">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">Поддержи стримера</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Отправить <span className="gradient-text">донат</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Каждый донат помогает делать стримы лучше — улучшать железо, покупать игры и посвящать больше времени контенту. Спасибо за поддержку!
              </p>

              <div className="space-y-4">
                {[
                  { icon: "Zap", title: "Попадёшь в лидерборд", desc: "Все донатеры видны в топе" },
                  { icon: "Star", title: "Упоминание в стриме", desc: "Прочитаю твоё сообщение в эфире" },
                  { icon: "Trophy", title: "Персональная игра", desc: "Топ-1 донатер играет со мной" },
                ].map(b => (
                  <div key={b.title} className="flex items-start gap-4 glass rounded-xl p-4 border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon name={b.icon} size={18} className="text-[var(--neon-purple)]" fallback="Star" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{b.title}</p>
                      <p className="text-white/40 text-sm mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass neon-border rounded-2xl p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Сумма доната</h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[50, 100, 200, 500, 1000, 2000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDonateAmount(amount)}
                    className={`py-2.5 rounded-xl text-sm font-display font-semibold tracking-wide transition-all duration-200
                      ${donateAmount === amount
                        ? "bg-purple-600 text-white border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        : "glass border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                      }`}
                  >
                    {amount} ₽
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <input
                  type="number"
                  value={donateAmount}
                  onChange={e => setDonateAmount(Number(e.target.value))}
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-white font-display text-lg
                    focus:outline-none focus:border-purple-500/50 transition-colors bg-transparent placeholder-white/20"
                  placeholder="Своя сумма..."
                />
              </div>

              <div className="mb-6">
                <textarea
                  value={donateMsg}
                  onChange={e => setDonateMsg(e.target.value)}
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                    focus:outline-none focus:border-purple-500/50 transition-colors bg-transparent placeholder-white/30 resize-none"
                  rows={3}
                  placeholder="Сообщение для стримера..."
                />
              </div>

              <button className="w-full py-4 rounded-xl font-display font-bold text-white text-base tracking-wider
                bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500
                hover:from-purple-500 hover:to-pink-400 transition-all duration-300
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                ОТПРАВИТЬ {donateAmount} ₽ 💜
              </button>

              <p className="text-center text-white/25 text-xs mt-4">
                Платёжная форма будет подключена по вашему запросу
              </p>
            </div>
          </div>
        </Section>

        {/* ЛИДЕРБОРД */}
        <Section id="leaderboard" className="pb-8">
          <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">Рейтинг поддержки</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">
            Топ <span className="gradient-text">донатеров</span>
          </h2>

          <div className="space-y-3">
            {DONORS.map((donor, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 glass rounded-xl px-6 py-4 border transition-all duration-300
                  ${i === 0 ? "border-yellow-500/40 bg-yellow-500/5" : i === 1 ? "border-gray-400/20" : i === 2 ? "border-orange-500/25" : "border-white/5 hover:border-white/10"}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg flex-shrink-0
                  ${i === 0 ? "bg-yellow-500/20 text-yellow-400" : i === 1 ? "bg-gray-500/20 text-gray-300" : i === 2 ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-white/30"}`}>
                  {i + 1}
                </div>

                <div className="text-2xl">{donor.avatar}</div>

                <div className="flex-1">
                  <p className={`font-display font-semibold tracking-wide
                    ${i === 0 ? "text-yellow-300" : i === 1 ? "text-gray-200" : i === 2 ? "text-orange-300" : "text-white/70"}`}>
                    {donor.name}
                  </p>
                </div>

                <div className="hidden sm:flex flex-1 items-center gap-3">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-yellow-500 to-yellow-300" : "bg-gradient-to-r from-purple-600 to-purple-400"}`}
                      style={{ width: `${(donor.amount / DONORS[0].amount) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={`font-display font-bold text-lg tracking-wide
                  ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-white/50"}`}>
                  {donor.amount.toLocaleString()} ₽
                </div>

                {i === 0 && <Icon name="Crown" size={18} className="text-yellow-400 flex-shrink-0" />}
              </div>
            ))}
          </div>

          <div className="mt-8 glass neon-border rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display text-white font-semibold">Хочешь попасть в топ?</p>
              <p className="text-white/40 text-sm mt-0.5">Отправь донат — рейтинг обновляется в реальном времени</p>
            </div>
            <button
              onClick={() => scrollTo("donate")}
              className="px-6 py-2.5 rounded-xl font-display font-semibold text-sm tracking-wide
                bg-gradient-to-r from-purple-600 to-purple-500 text-white
                hover:from-purple-500 hover:to-purple-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              ЗАДОНАТИТЬ
            </button>
          </div>
        </Section>

      </div>

      {/* Футер */}
      <footer className="border-t border-white/5 glass">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {SOCIALS.map(s => (
              <a
                key={s.name}
                href={s.url}
                className="group glass border border-white/5 rounded-2xl p-5 flex items-center gap-4
                  hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${s.color}20` }}
                >
                  <Icon name={s.icon} size={22} className="text-white/80" fallback="Link" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white tracking-wide">{s.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
                <Icon name="ArrowUpRight" size={16} className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <p className="font-display text-xl font-bold gradient-text tracking-widest">СТРИМЕР</p>
            <p className="text-white/25 text-sm">© 2024 · Dota 2 Live Streaming</p>
            <button
              onClick={() => scrollTo("hero")}
              className="w-9 h-9 glass border border-white/10 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
            >
              <Icon name="ChevronUp" size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}