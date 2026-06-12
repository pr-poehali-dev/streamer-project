import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { SCHEDULE, DONORS, GALLERY, SOCIALS } from "./data";

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

interface StreamerSectionsProps {
  scrollTo: (id: string) => void;
}

export default function StreamerSections({ scrollTo }: StreamerSectionsProps) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 space-y-32">

        {/* О СТРИМЕРЕ */}
        <Section id="about" className="pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-display tracking-[0.3em] text-[var(--neon-purple)] mb-4 uppercase">О стримере</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Стример<br />
                <span className="gradient-text">с 2023 года</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Привет! Стримлю с 2023 года. Начинал как простой игрок, а сейчас собрал сообщество настоящих ценителей игр. Каждый стрим — это не просто геймплей, это атмосфера, живое общение и отличное настроение.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                В эфире — <span className="text-[var(--neon-cyan)] font-semibold">Euro Truck Simulator 2, AMAZING RP, Counter-Strike 2</span> и много живого общения с подписчиками. Заходи, будем вместе!
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "2023", label: "начало стримов" },
                  { value: "50К+", label: "подписчиков" },
                  { value: "6 дней", label: "в неделю" },
                ].map(stat => (
                  <div key={stat.label} className="glass neon-border rounded-xl p-4 text-center">
                    <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "Tv", title: "Прямые эфиры", desc: "6 дней в неделю в 21:00" },
                { icon: "Users", title: "Живое общение", desc: "Отвечаю на все сообщения в чате" },
                { icon: "Gamepad2", title: "Разные игры", desc: "ETS2, AMAZING RP, CS2 и многое другое" },
                { icon: "Heart", title: "Сообщество", desc: "Тёплая атмосфера для каждого" },
              ].map(f => (
                <div key={f.title} className="flex items-center gap-4 glass border border-white/5 rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} size={18} className="text-[var(--neon-purple)]" fallback="Star" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-sm">{f.title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
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

            <div className="glass neon-border rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="text-6xl mb-6">💜</div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">DonationAlerts</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Нажми кнопку ниже — попадёшь на страницу доната. Там можно выбрать сумму и оставить сообщение, которое я зачитаю в прямом эфире!
              </p>

              <a
                href="https://www.donationalerts.com/r/artem_maybach"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-display font-bold text-white text-base tracking-wider text-center
                  bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500
                  hover:from-purple-500 hover:to-pink-400 transition-all duration-300
                  hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] block"
              >
                ЗАДОНАТИТЬ НА DONATIONALERTS 💜
              </a>

              <p className="text-white/25 text-xs mt-5">
                Переход на donationalerts.com/r/artem_maybach
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
            <p className="font-display text-xl font-bold gradient-text tracking-widest">ARTEM MAYBACH</p>
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
    </>
  );
}
