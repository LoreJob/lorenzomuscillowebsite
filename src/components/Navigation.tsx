import { useState, useEffect, useRef } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const navEyesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // NAV_ITEMS is a module-level constant and won't change, so it's safe to run this effect only once.
  }, []);

  useEffect(() => {
    const onScrollActive = () => {
      const mid = window.innerHeight / 2;
      let best = NAV_ITEMS[0].id;
      let bestDist = Infinity;
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = item.id;
        }
      });
      setActiveSection(best);
    };
    onScrollActive();
    window.addEventListener("scroll", onScrollActive, { passive: true });
    return () => window.removeEventListener("scroll", onScrollActive);
  }, []);

  // Optimized eyes follow cursor (desktop only) with periodic cache refresh
  useEffect(() => {
    const wrapper = navEyesRef.current;
    if (!wrapper) return;

    // Mutable cached arrays that we refresh periodically
    let sockets: HTMLElement[] = Array.from(wrapper.querySelectorAll<HTMLElement>(".eye-socket"));
    let pupils: HTMLElement[] = sockets.map((s) => s.querySelector<HTMLElement>(".eye-pupil")).filter(Boolean) as HTMLElement[];

    let centers: { x: number; y: number; maxTravel: number }[] = [];
    const updateCenters = () => {
      centers = sockets.map((s) => {
        const r = s.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          maxTravel: Math.max(2, r.width * 0.15),
        };
      });
    };

    const refreshCache = () => {
      sockets = Array.from(wrapper.querySelectorAll<HTMLElement>(".eye-socket"));
      pupils = sockets.map((s) => s.querySelector<HTMLElement>(".eye-pupil")).filter(Boolean) as HTMLElement[];
      updateCenters();
    };

    // Initial population
    refreshCache();

    const onResize = () => updateCenters();
    window.addEventListener("resize", onResize, { passive: true });

    // Also refresh cache periodically to avoid stale references causing lag over time
    const intervalId = window.setInterval(refreshCache, 3000);

    // Track the latest pointer position; update visuals in a RAF loop (once per frame)
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pointerMoved = false;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      let nx = pointer.x;
      let ny = pointer.y;
      if ((e as TouchEvent).touches && (e as TouchEvent).touches.length) {
        nx = (e as TouchEvent).touches[0].clientX;
        ny = (e as TouchEvent).touches[0].clientY;
      } else {
        nx = (e as MouseEvent).clientX;
        ny = (e as MouseEvent).clientY;
      }
      // Only mark moved if the pointer actually changed to avoid small-noise updates
      if (nx !== pointer.x || ny !== pointer.y) {
        pointer.x = nx;
        pointer.y = ny;
        pointerMoved = true;
      }
    };

    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });

    let rafId = 0;
    const loop = () => {
      // If pointer hasn't moved since last frame, skip heavy calculations
      if (pointerMoved && sockets.length && centers.length === sockets.length) {
        for (let i = 0; i < sockets.length; i++) {
          const pupil = pupils[i];
          const c = centers[i];
          if (!pupil || !c) continue;

          const dx = pointer.x - c.x;
          const dy = pointer.y - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;
          const travel = Math.min(c.maxTravel, dist * 0.08);
          const tx = Math.round(nx * travel);
          const ty = Math.round(ny * travel);

          // Use translate3d for better compositing; write only transform to avoid layout thrashing
          pupil.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          pupil.style.willChange = "transform";
        }
        // reset moved flag until next pointer event
        pointerMoved = false;
      }
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);

    const handleLeave = () => {
      // Reset pupils to center
      pupils.forEach((p) => (p.style.transform = `translate3d(0px, 0px, 0)`));
    };
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer as EventListener);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearInterval(intervalId);
    };
    // navEyesRef is a ref object; we don't want to re-run this effect unless the ref node changes
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Home"
            className="flex items-center justify-center w-10 h-10 border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
          >
            <span className="leading-none">L</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-white transition-colors group"
              >
                <span className="relative inline-block">
                  <span className="pointer-events-none">{item.label}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary rounded-full transition-all ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="border border-white/10 !text-white hover:bg-gray/10 hover:border-white/20 transition-colors rounded-lg px-6 py-3"
            >
              <span className="flex items-center justify-center gap-2 !text-white">
                <span className="font-medium !text-white">Let's Connect</span>
                <ExternalLink className="h-5 w-5 ml-2 text-current" />
              </span>
            </Button>
            {/* small eyes under the connect button on mobile */}
            <div className="flex items-center justify-center mt-3 gap-3 md:hidden" aria-hidden>
              <div className="eye-socket w-6 h-6 rounded-full flex items-center justify-center relative bg-white/5">
                <div className="eye-pupil w-3 h-3 bg-black rounded-full" style={{ transform: 'translate(0px,0px)' }} />
              </div>
              <div className="eye-socket w-6 h-6 rounded-full flex items-center justify-center relative bg-white/5">
                <div className="eye-pupil w-3 h-3 bg-black rounded-full" style={{ transform: 'translate(0px,0px)' }} />
              </div>
            </div>
            {/* small eyes after the connect button */}
            <div ref={navEyesRef} className="flex items-center ml-2 gap-2" aria-hidden>
              <div className="eye-socket w-6 h-6 rounded-full flex items-center justify-center relative bg-white/5">
                <div className="eye-pupil w-3 h-3 bg-black rounded-full" style={{ transform: 'translate(0px,0px)' }} />
              </div>
              <div className="eye-socket w-6 h-6 rounded-full flex items-center justify-center relative bg-white/5">
                <div className="eye-pupil w-3 h-3 bg-black rounded-full" style={{ transform: 'translate(0px,0px)' }} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-white transition-colors group"
              >
                <span className="relative inline-block">
                  <span className="pointer-events-none">{item.label}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary rounded-full transition-all ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="border border-white/10 !text-white hover:bg-gray/10 hover:border-white/20 transition-colors rounded-lg px-6 py-3 w-full"
            >
              <span className="flex items-center justify-center gap-2 !text-white">
                <span className="font-medium !text-white">Let's Connect</span>
                <ExternalLink className="h-5 w-5 ml-2 text-current" />
              </span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
