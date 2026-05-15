import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music2, X } from "lucide-react";

// Showcase tracks (replace with Ravi's actual recordings when available)
const TRACKS = [
  {
    title: "Cinematic Voyage",
    subtitle: "Live Showcase · Vijayawada",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_19f5b3b540.mp3?filename=cinematic-ambient-piano-3-148636.mp3",
  },
  {
    title: "Golden Hour",
    subtitle: "Studio Session",
    src: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_ce5762d1e9.mp3?filename=the-best-jazz-club-in-new-orleans-164472.mp3",
  },
  {
    title: "Stage Lights",
    subtitle: "Live · Concert Cut",
    src: "https://cdn.pixabay.com/download/audio/2023/06/28/audio_55ec4c67c0.mp3?filename=indian-flute-160933.mp3",
  },
];

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = new Audio(TRACKS[0].src);
    a.volume = 0.7;
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setT(a.currentTime);
    const onMeta = () => setDur(a.duration || 0);
    const onEnd = () => next();
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = (i: number, autoplay = true) => {
    const a = audioRef.current;
    if (!a) return;
    a.src = TRACKS[i].src;
    a.load();
    setT(0);
    if (autoplay) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    setIdx(i);
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  const next = () => load((idx + 1) % TRACKS.length);
  const prev = () => load((idx - 1 + TRACKS.length) % TRACKS.length);
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current; if (!a) return;
    const v = Number(e.target.value);
    a.currentTime = v;
    setT(v);
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Open music player"
        className="fixed bottom-6 right-6 z-[58] glass rounded-full px-4 py-3 flex items-center gap-3 hover:text-gold transition-colors"
      >
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
          <Music2 className="h-4 w-4 text-gold" />
          {playing && (
            <span className="absolute inset-0 rounded-full ring-2 ring-gold/60 animate-ping" />
          )}
        </span>
        <span className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[9px] tracking-[0.3em] uppercase text-gold/80">
            {playing ? "Now Playing" : "Listen"}
          </span>
          <span className="text-xs font-display truncate max-w-[160px]">{TRACKS[idx].title}</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[58] w-[min(92vw,380px)] glass rounded-3xl p-6 border border-gold/20"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80">RKM · Soundtrack</div>
              <button onClick={() => setOpen(false)} aria-label="Close player" className="text-foreground/60 hover:text-gold">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">
              <div className="font-display text-2xl leading-tight">{TRACKS[idx].title}</div>
              <div className="text-xs text-foreground/60 mt-1">{TRACKS[idx].subtitle}</div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <input
                type="range"
                min={0}
                max={dur || 0}
                value={t}
                onChange={seek}
                className="w-full accent-[oklch(0.82_0.14_80)] h-1"
                aria-label="Seek"
              />
              <div className="mt-1 flex justify-between text-[10px] font-mono text-foreground/60">
                <span>{fmt(t)}</span><span>{fmt(dur)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-center gap-6">
              <button onClick={prev} aria-label="Previous track" className="text-foreground/70 hover:text-gold transition-colors">
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="h-12 w-12 rounded-full bg-gold text-background flex items-center justify-center hover:scale-105 transition-transform"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>
              <button onClick={next} aria-label="Next track" className="text-foreground/70 hover:text-gold transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Playlist */}
            <div className="mt-6 space-y-1.5">
              {TRACKS.map((tr, i) => (
                <button
                  key={tr.title}
                  onClick={() => load(i)}
                  className={`w-full text-left rounded-lg px-3 py-2 flex items-center justify-between gap-3 transition-colors ${i === idx ? "bg-gold/10 text-foreground" : "hover:bg-white/5 text-foreground/70"}`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className={`text-[10px] font-mono ${i === idx ? "text-gold" : "text-foreground/40"}`}>0{i + 1}</span>
                    <span className="truncate text-sm font-display">{tr.title}</span>
                  </span>
                  {i === idx && playing && (
                    <span className="flex items-end gap-[2px] h-3">
                      {[0, 1, 2].map((b) => (
                        <span key={b} className="w-[2px] bg-gold origin-bottom" style={{ height: "100%", animation: `equalizer 0.${6 + b}s ease-in-out ${b * 0.1}s infinite` }} />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
