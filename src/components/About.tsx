import { Code } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const About = () => {
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
    <section id="about" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="relative mb-8">
          <h2 className="text-4xl md:text-4xl font-semibold leading-none text-primary tracking-tight">
            About Me{`{`}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left column: image */}
          <div className="flex items-start justify-center">
            <div className="relative w-full max-w-sm">
              <span className="absolute -top-6 -left-6 text-primary text-4xl md:text-4xl font-semibold z-10">[</span>
              <div className="rounded-xl overflow-hidden bg-white/5 shadow-lg">
                <img
                  src="images/Screenshot 2025-11-27 at 6.32.12 PM.png"
                  alt="Foto di me"
                  className="w-full h-full object-cover block"
                />
              </div>
              <span className="absolute -bottom-6 -right-8 text-primary text-4xl md:text-4xl font-semibold z-10">{'];'}</span>
            </div>
          </div>

          {/* Right column: long paragraph */}
          <div className="relative prose prose-invert max-w-none text-lg leading-relaxed space-y-6 tracking-wide">
            <span className="absolute -top-6 -left-6 text-primary text-4xl md:text-4xl font-semibold z-10">[</span>
            <p>
              I touched my first computer at five years old, and since then I’ve lived a thousand lives.
              I played football, athletics, rugby, and even practiced karate. I trained as a chef (yes seriously), then pivoted into finance for my bachelor’s, and pivoted again into data analytics for my master’s in Venice, concluding with a medical computer-vision research semester at ETH Zürich.
            </p>
            <p>
              I’ve worked in startups as a data scientist and product developer, and in big companies as a product manager.
              When I say I’m multimodal, I truly mean it.
            </p>
            <span className="absolute -bottom-6 -right-6 text-primary text-4xl md:text-4xl font-semibold z-10">{']}'}</span>
          </div>
        </div>
      </div>

      {/* closing brace (matches opening) */}
      

      {/* Navigation dots removed from About; use the global `PageDots` component instead. */}
    </section>
  );
};

export default About;
