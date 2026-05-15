import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/hooks/use-lenis";
import { CinematicLoader } from "@/components/cine/Loader";
import { Nav } from "@/components/cine/Nav";
import { MusicPlayer } from "@/components/cine/MusicPlayer";
import {
  Hero, Origin, Music, Stage, Gallery, Studio, Brands, UAE, Vizagites,
  Timeline, Industries, Legacy, Contact,
} from "@/components/cine/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ravi Kumar Manda — Singer · Entrepreneur · Visionary" },
      { name: "description", content: "A cinematic portfolio of Ravi Kumar Manda — from a small village in Andhra Pradesh to global stages, recording studios in Vijayawada and luxury real estate in the UAE." },
      { property: "og:title", content: "Ravi Kumar Manda — A Cinematic Journey" },
      { property: "og:description", content: "Singer. Entrepreneur. Visionary. An immersive scroll-driven portfolio." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  // Cinematic cursor follower (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <CinematicLoader />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60]"
      />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[55] h-8 w-8 rounded-full border border-gold/70 mix-blend-difference hidden md:block"
      />

      <Nav />
      <MusicPlayer />

      <Hero />
      <Origin />
      <Music />
      <Stage />
      <Gallery />
      <Studio />
      <Brands />
      <UAE />
      <Vizagites />
      <Timeline />
      <Industries />
      <Legacy />
      <Contact />
    </main>
  );
}
