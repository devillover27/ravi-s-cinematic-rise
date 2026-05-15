export function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count });
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 97) % 100;
        const size = ((i % 3) + 1);
        const delay = (i % 7) * 0.6;
        const dur = 6 + (i % 5);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/60 animate-float-slow"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity: 0.25 + (i % 5) * 0.12,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              filter: "blur(0.4px)",
            }}
          />
        );
      })}
    </div>
  );
}
