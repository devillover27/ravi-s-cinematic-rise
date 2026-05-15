import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "origin", label: "Origin" },
  { id: "music", label: "Music" },
  { id: "stage", label: "Stage" },
  { id: "studio", label: "Studio" },
  { id: "brands", label: "Brands" },
  { id: "uae", label: "UAE" },
  { id: "vizagites", label: "Community" },
  { id: "timeline", label: "Timeline" },
  { id: "industries", label: "Industries" },
  { id: "legacy", label: "Legacy" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className={`mx-auto flex items-center justify-between px-6 md:px-10 transition-all ${scrolled ? "max-w-6xl glass rounded-full py-2.5" : "max-w-7xl"}`}>
        <a href="#top" className="font-display text-lg tracking-tight">
          <span className="gold-text">RKM</span>
          <span className="text-foreground/60">.</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[11px] tracking-[0.22em] uppercase text-foreground/70">
          {links.slice(0, 6).map((l) => (
            <a key={l.id} href={`#${l.id}`} className="hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-3 glass rounded-full px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-foreground/80 hover:text-gold transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Get in touch
        </a>
      </div>
    </motion.header>
  );
}
