import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Particles } from "./Particles";
import heroStage from "@/assets/hero-stage.jpg";
import villageImg from "@/assets/origin-village.jpg";
import studioImg from "@/assets/studio.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import concertImg from "@/assets/concert.jpg";
import legacyImg from "@/assets/legacy-portrait.jpg";
import raviPortrait from "@/assets/ravi-portrait.jpg";
import raviStage from "@/assets/ravi-stage.jpg";
import raviEvent from "@/assets/ravi-event.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-gold/80">
      <span className="font-mono">CH. {n}</span>
      <span className="h-px w-10 bg-gold/40" />
      <span className="text-foreground/60">{label}</span>
    </div>
  );
}

/* ---------- HERO ---------- */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative h-[110vh] w-full overflow-hidden grain vignette">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={raviStage} alt="Ravi Kumar Manda performing on stage under a golden spotlight" className="h-full w-full object-cover object-[center_20%]" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </motion.div>
      <Particles count={50} />
      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1.6, ease, delay: 1.2 }}
          className="text-[10px] md:text-xs uppercase text-gold/90"
        >
          A Cinematic Portfolio · Est. 1986
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 1.5 }}
          className="mt-6 font-display text-[14vw] leading-[0.9] md:text-[8.5vw] text-balance"
        >
          <span className="gold-text">Ravi Kumar</span>
          <br />
          <span className="italic font-light text-foreground/95">Manda</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 2.2 }}
          className="mt-8 text-sm md:text-base text-foreground/70 tracking-[0.3em] uppercase"
        >
          Singer · Entrepreneur · Visionary
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 2.6 }}
          className="mt-6 max-w-xl text-balance text-foreground/60 italic font-display text-lg"
        >
          From a small village in Andhra Pradesh to global stages and international ventures.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/60">Scroll</span>
        <div className="relative h-12 w-px bg-foreground/20 overflow-hidden">
          <motion.span
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-6 bg-gold"
          />
        </div>
      </motion.div>

      {/* Voice waveform */}
      <div className="absolute bottom-0 inset-x-0 z-10 flex items-end justify-center gap-[3px] h-20 pb-6 mask-fade-b opacity-70">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] bg-gold/70 rounded-full origin-bottom"
            style={{
              height: `${20 + Math.abs(Math.sin(i * 0.6)) * 60}%`,
              animation: `equalizer ${0.8 + (i % 5) * 0.1}s ease-in-out ${(i % 9) * 0.05}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- ORIGIN ---------- */
export function Origin() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  return (
    <section id="origin" ref={ref} className="relative min-h-screen overflow-hidden py-32 md:py-48">
      <motion.div style={{ x }} className="absolute inset-0 -z-10">
        <img src={villageImg} alt="A village in Andhra Pradesh at dusk" className="h-full w-full object-cover opacity-30" width={1920} height={1080} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />
      </motion.div>
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <SectionLabel n="01" label="The Origin" />
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.95] text-balance">
            Born under <span className="italic gold-text">open skies</span>,
            <br /> raised by quiet courage.
          </h2>
        </Reveal>
        <motion.div style={{ y }} className="mt-16 grid md:grid-cols-2 gap-12">
          <Reveal delay={0.2}>
            <p className="text-foreground/70 text-lg leading-relaxed font-display italic">
              On the 23rd of January, 1986, in Chegireddipadu — a small village
              tucked inside G. Konduru Mandal, Andhra Pradesh — a voice was born
              that would one day cross oceans.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="grid grid-cols-2 gap-6 text-sm">
              {[
                ["Born", "23 · 01 · 1986"],
                ["Village", "Chegireddipadu"],
                ["Mandal", "G. Konduru"],
                ["State", "Andhra Pradesh"],
                ["Father", "Babu Rao"],
                ["Mother", "Ruthumma"],
              ].map(([k, v]) => (
                <div key={k} className="border-l border-gold/30 pl-4">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">{k}</div>
                  <div className="mt-1 font-display text-xl">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        {/* Floating handwritten word */}
        <Reveal delay={0.5}>
          <div className="mt-24 text-center">
            <span className="font-display italic text-[14vw] md:text-[10vw] leading-none text-foreground/[0.06] select-none">
              ఆరంభం
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- MUSIC ---------- */
const SHOWS = [
  "Paadutha Teeyaga",
  "Once More Please",
  "Swarabhishekam",
  "Aha Ihi Oho",
  "Maa TV Super Singer",
];
export function Music() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xMarquee = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);
  return (
    <section id="music" ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[oklch(0.13_0.02_50)] to-background" />
      <Particles count={30} className="opacity-50" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel n="02" label="The Music Journey" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.95] max-w-5xl text-balance">
            A boy with a microphone, <br />
            a <span className="gold-text italic">nation listening</span>.
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            ["1500+", "Stage Shows", "Across India and abroad"],
            ["5", "TV Reality Shows", "From audition to finalist"],
            ["∞", "Hearts Touched", "From crowds of millions"],
          ].map(([n, t, s], i) => (
            <Reveal key={t} delay={i * 0.12}>
              <div className="glass rounded-2xl p-8 hover:border-gold/40 transition-colors">
                <div className="font-display text-7xl gold-text">{n}</div>
                <div className="mt-3 text-sm tracking-[0.2em] uppercase text-foreground/80">{t}</div>
                <div className="mt-2 text-sm text-foreground/50">{s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee of show names */}
      <div className="mt-32 overflow-hidden">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold/80 px-6 md:px-10 mb-6">
          Featured On
        </div>
        <motion.div style={{ x: xMarquee }} className="flex gap-16 whitespace-nowrap">
          {[...SHOWS, ...SHOWS, ...SHOWS].map((s, i) => (
            <span key={i} className="font-display italic text-7xl md:text-[8vw] text-foreground/30 hover:text-gold transition-colors">
              {s} <span className="text-gold/60 mx-4">★</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- STAGE ---------- */
export function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.05, 1.4]);
  return (
    <section id="stage" ref={ref} className="relative h-[140vh] overflow-hidden grain vignette">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={raviPortrait} alt="Ravi Kumar Manda speaking on stage with a microphone" className="h-full w-full object-cover" width={1920} height={1080} loading="lazy" />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      <div className="sticky top-0 h-screen flex items-center justify-center px-6 z-10">
        <div className="text-center max-w-5xl">
          <SectionLabel n="03" label="Live Performance" />
          <Reveal>
            <h2 className="mt-10 font-display text-6xl md:text-[10vw] leading-[0.9] text-balance">
              Every stage <br />
              became a <em className="gold-text italic">story</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <h3 className="mt-6 font-display text-3xl md:text-5xl italic text-foreground/70">
              Every performance — an emotion.
            </h3>
          </Reveal>

          {/* Audio bars */}
          <div className="mt-16 mx-auto flex items-end justify-center gap-1.5 h-24 max-w-md">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 bg-gradient-to-t from-gold/30 to-gold rounded-full origin-bottom"
                style={{
                  height: "100%",
                  animation: `equalizer ${0.6 + (i % 4) * 0.15}s ease-in-out ${(i % 7) * 0.07}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STUDIO ---------- */
export function Studio() {
  return (
    <section id="studio" className="relative py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel n="04" label="Recording Studio & Events" />
        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <Reveal>
            <h2 className="lg:col-span-7 font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              From the spotlight,<br />
              he built the <span className="gold-text italic">soundscape</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lg:col-span-5 text-foreground/70 leading-relaxed">
              A state-of-the-art recording studio in Vijayawada — a sanctuary
              for artists, a laboratory for sound. Around it, an event-management
              practice scoring concerts, weddings and brand spectacles with the
              same cinematic care.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 relative rounded-3xl overflow-hidden border border-gold/15">
            <img src={studioImg} alt="Inside a premium recording studio bathed in teal and amber light" className="w-full h-[60vh] object-cover" width={1920} height={1080} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap justify-between gap-6">
              {[
                ["Studio", "Vijayawada Flagship"],
                ["Disciplines", "Mixing · Mastering · Live"],
                ["Crew", "10+ engineers & producers"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold">{k}</div>
                  <div className="font-display text-2xl mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- BRANDS ---------- */
export function Brands() {
  const items = [
    { t: "Ravi Music Live", d: "Live band & concert production" },
    { t: "RKM Studios", d: "Premium recording & mixing" },
    { t: "RKM Events", d: "Cinematic event management" },
    { t: "RKM Realty (UAE)", d: "Luxury property advisory" },
    { t: "Vizagites Meet & Greet", d: "Global cultural network" },
    { t: "RKM Ventures", d: "Multi-industry holding" },
  ];
  return (
    <section id="brands" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_50%,oklch(0.18_0.04_60),transparent)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel n="05" label="Brands & Entrepreneurship" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.95] text-balance">
            One vision, <span className="italic gold-text">many worlds</span>.
          </h2>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08}>
              <div className="group relative h-64 rounded-2xl glass p-8 flex flex-col justify-between overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">0{i + 1} / Brand</div>
                <div>
                  <div className="font-display text-3xl">{b.t}</div>
                  <div className="mt-2 text-sm text-foreground/60">{b.d}</div>
                </div>
                <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- UAE ---------- */
export function UAE() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section id="uae" ref={ref} className="relative min-h-[120vh] overflow-hidden grain vignette">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <img src={dubaiImg} alt="Dubai skyline at golden hour" className="h-full w-full object-cover" width={1920} height={1080} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-32">
        <SectionLabel n="06" label="UAE Real Estate" />
        <Reveal>
          <h2 className="mt-8 font-display text-6xl md:text-[9vw] leading-[0.9] text-balance">
            Dreams <em className="gold-text italic">crossed</em>
            <br /> borders.
          </h2>
        </Reveal>

        <div className="mt-24 grid md:grid-cols-2 gap-16 items-end">
          <Reveal delay={0.2}>
            <p className="text-xl text-foreground/80 leading-relaxed font-display italic">
              An expansion into the heart of the Emirates — premium properties,
              global investors, and a bridge between two homes.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="space-y-5">
              {[
                ["Markets", "Dubai · Abu Dhabi · Sharjah"],
                ["Specialty", "Luxury residential & investment"],
                ["Network", "India ⇄ UAE diaspora"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-gold/15 pb-3">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-gold/80">{k}</span>
                  <span className="font-display text-xl text-right">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- VIZAGITES ---------- */
export function Vizagites() {
  return (
    <section id="vizagites" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_30%,oklch(0.20_0.06_50),transparent)]" />
      <div className="mx-auto max-w-6xl px-6 md:px-10 text-center">
        <SectionLabel n="07" label="Vizagites Meet & Greet" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-7xl text-balance">
            Five hundred families.<br />
            <em className="gold-text italic">One belonging.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-foreground/70 max-w-2xl mx-auto">
            A community knit across continents — connecting Vizag families
            abroad, opening trusted investment doors, and keeping the warmth
            of home alive in cold cities.
          </p>
        </Reveal>

        {/* Connection lines visual */}
        <Reveal delay={0.35}>
          <div className="relative mt-20 h-72 md:h-96 mx-auto max-w-3xl">
            <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.82 0.14 80)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.82 0.14 80)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {Array.from({ length: 28 }).map((_, i) => {
                const angle = (i / 28) * Math.PI * 2;
                const r = 110 + (i % 3) * 30;
                const x = 300 + Math.cos(angle) * r;
                const y = 150 + Math.sin(angle) * r * 0.55;
                return (
                  <g key={i}>
                    <line x1="300" y1="150" x2={x} y2={y} stroke="oklch(0.82 0.14 80)" strokeOpacity="0.18" strokeWidth="0.6" />
                    <circle cx={x} cy={y} r="2" fill="oklch(0.82 0.14 80)" opacity="0.7">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 4)}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}
              <circle cx="300" cy="150" r="60" fill="url(#g)" />
              <circle cx="300" cy="150" r="6" fill="oklch(0.82 0.14 80)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display text-5xl gold-text">500+</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- TIMELINE ---------- */
const milestones = [
  ["1986", "A voice is born in Chegireddipadu, Andhra Pradesh."],
  ["2000s", "Discovers his passion for music; sings on every stage he can find."],
  ["2010", "Becomes a finalist on Telugu reality shows including Paadutha Teeyaga."],
  ["2014", "Crosses 500 live stage performances across India."],
  ["2017", "Launches his flagship recording studio in Vijayawada."],
  ["2019", "Builds a full event-management practice and a live band."],
  ["2022", "Expands into UAE real estate — properties, partnerships, investors."],
  ["2024", "Founds Vizagites Meet & Greet, connecting 500+ families abroad."],
  ["Today", "1500+ shows, multiple brands, and a story still being written."],
] as const;

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineH = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <section id="timeline" ref={ref} className="relative py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionLabel n="08" label="Achievements Timeline" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-7xl text-balance">
            A life measured in <em className="gold-text italic">milestones</em>.
          </h2>
        </Reveal>

        <div className="relative mt-24 pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px bg-foreground/10" />
          <motion.div
            style={{ scaleY: lineH, transformOrigin: "top" }}
            className="absolute left-2 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold to-transparent"
          />
          <div className="space-y-20">
            {milestones.map(([year, text], i) => (
              <TimelineItem key={year} year={year} text={text} progress={lineH} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ year, text }: { year: string; text: string; progress: MotionValue<number>; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 1, ease }}
      className="relative"
    >
      <span className="absolute -left-[38px] md:-left-[50px] top-3 h-3 w-3 rounded-full bg-gold ring-4 ring-background">
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-pulse-ring" />
      </span>
      <div className="font-mono text-xs tracking-[0.3em] text-gold/80">{year}</div>
      <p className="mt-3 font-display text-2xl md:text-4xl leading-tight text-foreground/90 text-balance">
        {text}
      </p>
    </motion.div>
  );
}

/* ---------- INDUSTRIES ---------- */
const industries = [
  { t: "Singing", d: "Telugu reality finalist · 1500+ live shows", img: heroStage },
  { t: "Music Production", d: "Recordings, mixing, mastering", img: studioImg },
  { t: "Live Events", d: "Concerts, weddings, brand spectacles", img: concertImg },
  { t: "Recording Studio", d: "Vijayawada flagship facility", img: studioImg },
  { t: "Real Estate", d: "Luxury UAE residential & investment", img: dubaiImg },
  { t: "Brand Management", d: "Multi-vertical entrepreneurship", img: legacyImg },
  { t: "Cultural Networking", d: "Vizagites global community", img: villageImg },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel n="09" label="Industries" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-8xl text-balance">
            Seven worlds, <em className="gold-text italic">one signature</em>.
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((it, i) => (
            <Reveal key={it.t} delay={(i % 3) * 0.1}>
              <div className="group relative h-[26rem] rounded-2xl overflow-hidden border border-gold/10">
                <img src={it.img} alt={it.t} className="absolute inset-0 h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1500ms] ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold/90">{`0${i + 1}`.slice(-2)}</div>
                  <div className="mt-2 font-display text-3xl md:text-4xl">{it.t}</div>
                  <div className="mt-2 text-sm text-foreground/70 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {it.d}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- LEGACY ---------- */
export function Legacy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const blurPx = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, 8]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);
  return (
    <section id="legacy" ref={ref} className="relative py-40 overflow-hidden grain">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <motion.div style={{ y }} className="lg:col-span-5 relative">
          <motion.div style={{ filter }} className="rounded-2xl overflow-hidden border border-gold/15">
            <img src={raviEvent} alt="Ravi Kumar Manda — portrait at an industry event" className="w-full h-[70vh] object-cover" width={1280} height={1600} loading="lazy" />
          </motion.div>
          <div className="absolute -inset-6 -z-10 bg-gold/10 blur-3xl rounded-full" />
        </motion.div>
        <div className="lg:col-span-7">
          <SectionLabel n="10" label="The Legacy" />
          <Reveal>
            <h2 className="mt-8 font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              Talent inspired the journey.
              <br />
              <em className="gold-text italic">Vision built the empire.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-foreground/70 text-lg leading-relaxed max-w-xl">
              From a village stage to studios, skylines and a global community —
              the same voice still hums underneath every venture. A reminder
              that craft, when paired with conviction, becomes a kingdom.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden border-t border-gold/10">
      <Particles count={26} />
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionLabel n="11" label="Contact" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.9] text-balance">
            Let's <em className="gold-text italic">create</em><br /> the next chapter.
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="space-y-6"
            >
              {[
                ["name", "Your name"],
                ["email", "Your email"],
                ["subject", "Subject"],
              ].map(([id, label]) => (
                <div key={id} className="group">
                  <label htmlFor={id} className="block text-[10px] tracking-[0.3em] uppercase text-gold/70">{label}</label>
                  <input id={id} name={id} className="mt-2 w-full bg-transparent border-b border-foreground/15 focus:border-gold outline-none py-3 text-lg transition-colors" />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-[10px] tracking-[0.3em] uppercase text-gold/70">Message</label>
                <textarea id="message" rows={4} className="mt-2 w-full bg-transparent border-b border-foreground/15 focus:border-gold outline-none py-3 text-lg transition-colors resize-none" />
              </div>
              <button type="submit" className="mt-4 group inline-flex items-center gap-4 font-display text-xl">
                <span className="gold-text">Send the signal</span>
                <span className="h-px w-12 bg-gold transition-all group-hover:w-24" />
                <span className="text-gold">→</span>
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-10">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Studios</div>
                <div className="mt-2 font-display text-2xl">Vijayawada, Andhra Pradesh</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">UAE Office</div>
                <div className="mt-2 font-display text-2xl">Dubai, United Arab Emirates</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Booking & Press</div>
                <a href="mailto:hello@ravikumarmanda.com" className="mt-2 block font-display text-2xl hover:text-gold transition-colors">hello@ravikumarmanda.com</a>
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                {["Instagram", "YouTube", "Spotify", "LinkedIn", "X"].map((s) => (
                  <a key={s} href="#" className="glass rounded-full px-4 py-2 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 hairline" />
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <div>© {new Date().getFullYear()} Ravi Kumar Manda. All rights reserved.</div>
          <div className="font-display italic">— A cinematic portfolio.</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
const galleryImages = [
  { src: raviStage, alt: "Ravi performing live on stage", span: "md:col-span-2 md:row-span-2" },
  { src: raviPortrait, alt: "Ravi addressing an audience", span: "" },
  { src: raviEvent, alt: "Ravi at an industry event", span: "md:row-span-2" },
  { src: concertImg, alt: "Concert lights and crowd", span: "" },
  { src: studioImg, alt: "Inside the recording studio", span: "md:col-span-2" },
  { src: dubaiImg, alt: "Dubai skyline at golden hour", span: "" },
];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  return (
    <section id="gallery" ref={ref} className="relative py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel n="07" label="Frames From The Journey" />
        <Reveal>
          <h2 className="mt-8 font-display text-5xl md:text-8xl leading-[0.95] text-balance">
            Moments, <em className="gold-text italic">framed in light</em>.
          </h2>
        </Reveal>
        <motion.div
          style={{ y }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4"
        >
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <div className={`group relative h-full w-full overflow-hidden rounded-2xl border border-gold/10 ${img.span}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1400ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute bottom-3 left-4 right-4 text-[10px] tracking-[0.3em] uppercase text-foreground/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {img.alt}
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
