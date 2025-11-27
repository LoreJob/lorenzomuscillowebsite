import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const PageDots = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      navItems.forEach((item, idx) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });
      setActive(best);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:flex flex-col items-center gap-4 fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      {navItems.map((item, idx) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={`w-3 h-3 rounded-full border-2 border-white/20 transition-all ${
            idx === active ? "bg-primary scale-125 border-primary" : "bg-white/10"
          }`}
          aria-label={item.label}
          title={item.label}
        />
      ))}
    </div>
  );
};

export default PageDots;
