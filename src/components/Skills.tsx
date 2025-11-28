import React, { useMemo, useRef, useEffect, useState } from "react";
import { Cloud, Cpu, Code, Box, Layers, GitBranch, Zap, Database, Camera } from "lucide-react";

const BASE = [
  { label: "Machine Learning", icon: Layers, category: "ML" },
  { label: "Python", icon: Code, category: "Languages" },
  { label: "Cloud Computing", icon: Cloud, category: "Infra" },
  { label: "Data Science", icon: Cpu, category: "ML" },
  { label: "SQL", icon: Database, category: "Languages" },
  { label: "Computer Vision", icon: Camera, category: "ML" },
  { label: "Research", icon: GitBranch, category: "Research" },
  { label: "Logistics", icon: Box, category: "Tools" },
  { label: "Artificial Intelligence", icon: Zap, category: "ML" },
];

const CATEGORY_COLORS: Record<string, string> = {
  ML: '#3B82F6', // blue primary
  Languages: '#06B6D4', // teal
  Infra: '#84CC16', // lime
  Tools: '#8B5CF6',
  Research: '#F97316',
};

// Generate initial item data once at module load to avoid runtime warnings
const INITIAL_ITEMS = BASE.map((b) => ({
  ...b,
  dur: +(Math.random() * 2 + 6).toFixed(2),
  delay: +(Math.random() * 2).toFixed(2),
  scale: +(Math.random() * 0.25 + 1.05).toFixed(2),
  fromColor: Math.random() < 0.5 ? "#9ca3af" : "#3b82f6",
  color: CATEGORY_COLORS[b.category] || '#3b82f6',
  categoryColor: CATEGORY_COLORS[b.category] || '#9ca3af',
}));

const Skills = () => {
  const base = BASE;
  const categoryColors = CATEGORY_COLORS;

  const itemCount = base.length;
  const step = 360 / itemCount;
  const radius = 300; // px (adjustable) — increased to expand the circle

  // Use precomputed initial items
  const items = INITIAL_ITEMS;

  // responsive: switch to pill cloud on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rotRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rot, setRot] = useState(0);

  // helper: convert hex to rgba string
  const hexToRgba = (hex: string, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const activeColor = items[activeIndex]?.color || '#3b82f6';

  // rotation speed degrees per second (clockwise)
  // lowered to slow the ring rotation for a calmer effect
  const speed = 6; // degrees per second (clockwise)

  useEffect(() => {
    const stepDeg = step;
    const tick = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      rotRef.current = (rotRef.current + speed * dt) % 360;

      // active index is the item whose (theta + rotation) % 360 is near 0 (top)
      const topAngle = (360 - (rotRef.current % 360)) % 360; // amount to rotate so that 0 is on top
      const idx = Math.round(topAngle / stepDeg) % itemCount;
      setActiveIndex(idx);

      // publish rotation to state so React re-renders smoothly
      setRot(rotRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [step, itemCount]);

  return (
    <section id="skills" className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl flex flex-col items-center">
        <div className="w-full mb-2">
          <div className="max-w-3xl">
            <h2 className="text-6xl md:text-4xl font-semibold leading-none text-primary tracking-tight text-left">Skills</h2>
            <p className="text-lg text-white mb-6 max-w-2xl mt-6 text-left">The tools and technologies I use to try to do something.</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center skills-layer" style={{ height: radius * 2 + 240, maxWidth: '100%' }}>
          <div className="relative skills-entrance" style={{ width: radius * 2, height: radius * 2, margin: '0 auto' }}>
            {/* center area for icons / content (positioned inside the same relative square) */}
            {/* center: prominent focal element */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <div className="center-pulse" aria-hidden="true" style={{ boxShadow: `0 0 40px ${hexToRgba(activeColor, 0.12)}` }} />
              <div className="w-28 h-28 rounded-full glass-panel flex items-center justify-center blue-glow relative z-10">
                {items[activeIndex] && (() => {
                  const ActiveIcon = items[activeIndex].icon;
                  const c = items[activeIndex].color || '#3b82f6';
                  return <ActiveIcon className="w-16 h-16" style={{ color: c }} />;
                })()}
              </div>
              <div className="mt-3 text-sm font-mono font-semibold text-white text-center" style={{maxWidth: 160}}>
                {items[activeIndex]?.label}
              </div>
            </div>
            {/* rotating ring container - items compute their final angle including the rotation so labels can be kept upright */}
            {!isMobile && items.map((it, i) => {
              const theta = i * step; // base angle for this item
              const rotVal = rot; // current rotation in degrees (state-driven)
              const finalAngle = theta + rotVal; // apply rotation to position
              const transform = `translate(-50%,-50%) rotate(${finalAngle}deg) translate(0, -${radius}px) rotate(${-finalAngle}deg)`;
              const isActive = i === activeIndex;
              return (
                <div
                  key={it.label}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform }}
                >
                  <button
                    className="skill-label flex items-center cursor-pointer text-center"
                    aria-label={it.label}
                    style={{
                      transformOrigin: 'center',
                      fontWeight: isActive ? 700 : 500,
                      whiteSpace: 'nowrap',
                      fontSize: 14,
                      willChange: 'transform, opacity',
                      padding: '8px 10px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      outline: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      ...(isActive ? { textShadow: `0 0 10px ${it.categoryColor}`, transform: 'scale(1.03)' } : {}),
                    } as React.CSSProperties}
                  >
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: it.categoryColor }} />
                    <div className="font-mono text-sm">{it.label}</div>
                  </button>
                </div>
              );
            })}
            
            {/* mobile pill-cloud fallback */}
            {isMobile && (
              <div className="absolute left-0 right-0 top-0 flex items-center justify-center p-6">
                <div className="w-full overflow-x-auto py-4">
                  <div className="flex gap-3 items-center">
                    {items.map((it, idx) => (
                      <button
                        key={it.label}
                        className={`px-4 py-2 rounded-full whitespace-nowrap font-mono text-sm transition-transform min-h-[44px] flex items-center ${idx === activeIndex ? 'bg-primary text-primary-foreground font-bold scale-105' : 'bg-white/6 text-white'}`}
                      >
                        <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: it.categoryColor }} />
                        {it.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* no animations: static white labels */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
