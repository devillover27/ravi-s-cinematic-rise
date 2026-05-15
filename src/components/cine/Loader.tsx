import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CinematicLoader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setDone(true), 500); }
      setPct(Math.floor(p));
    }, 110);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl tracking-tight gold-text"
          >
            Ravi Kumar Manda
          </motion.div>
          <div className="mt-10 w-[260px] md:w-[360px]">
            <div className="h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
              <span>Loading the journey</span>
              <span>{pct.toString().padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
