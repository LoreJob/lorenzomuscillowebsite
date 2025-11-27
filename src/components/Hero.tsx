import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import HeroImage from "../../images/558db811-427e-4579-835d-2d6a978c4b4d.png";
const roles = ["Data Scientist", "Data Analyst", "AI Engineer"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  // Development-only test: throw during render when URL contains ?error=true
  // This lets us verify the ErrorBoundary fallback without permanent changes.
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.location.search.includes('error=true')) {
    throw new Error('Test Error: ErrorBoundary fallback');
  }
  const [imageVisible, setImageVisible] = useState(false);
  const hasShownImage = useRef(false);
  const cyclesRef = useRef(0);
  const [limitReached, setLimitReached] = useState(false);
   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  // typing effect for faux research/search input
  const [typedPrompt, setTypedPrompt] = useState("");
  const typingTimeout = useRef<number | null>(null);
  const typingIndex = useRef(0);
  useEffect(() => {
    const prompt = "Generate Lorenzo in cartoon style";
    // reset state in case effect runs multiple times (StrictMode)
    setTypedPrompt("");
    typingIndex.current = 0;

    const tick = () => {
      if (typingIndex.current < prompt.length) {
        typingIndex.current += 1;
        setTypedPrompt(prompt.slice(0, typingIndex.current));
        typingTimeout.current = window.setTimeout(tick, 70);
      } else {
          // finished typing: increment cycle counter and decide next step
          cyclesRef.current += 1;
          if (cyclesRef.current >= 5) {
            // reached limit: permanently show image and display final message
            setImageVisible(true);
            setTypedPrompt("Well, you can't expect him to appear and disappear all day, can you?");
            setLimitReached(true);
            // do not schedule further restarts
            return;
          }

          // otherwise behave as before: show the image once, then hide and restart
          if (!hasShownImage.current) {
            setImageVisible(true);
            hasShownImage.current = true;
          }
          typingTimeout.current = window.setTimeout(() => {
            // prepare to restart typing: clear the prompt and restart the loading cycle
            typingIndex.current = 0;
            setTypedPrompt("");
            setImageVisible(false);
            hasShownImage.current = false;
            typingTimeout.current = window.setTimeout(tick, 800); // restart after short pause
          }, 3000);
      }
    };

    tick();

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
        typingTimeout.current = null;
      }
    };
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  // Eyes cursor-following logic
  const eyesRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = document.getElementById('eyes-wrapper') as HTMLDivElement | null;
    eyesRef.current = wrapper;
    if (!wrapper) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const onTouchMove = (ev: TouchEvent) => {
      const t = ev.touches[0];
      if (t) { mouseRef.current = { x: t.clientX, y: t.clientY }; if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick); }
    };

    const tick = () => {
      rafRef.current = null;
      if (!eyesRef.current) return;
      const sockets = Array.from(eyesRef.current.querySelectorAll('.eye-socket')) as HTMLElement[];
      sockets.forEach((sock) => {
        const pupil = sock.querySelector('.eye-pupil') as HTMLElement | null;
        if (!pupil) return;
        const rect = sock.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        // normalized -1..1
        const nx = Math.max(-1, Math.min(1, dx / (rect.width)));
        const ny = Math.max(-1, Math.min(1, dy / (rect.height)));
        const maxX = rect.width * 0.18; // pupil travel limits
        const maxY = rect.height * 0.18;
        const tx = nx * maxX;
        const ty = ny * maxY;
        pupil.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
      {/* background: spinner until imageVisible === true, then show hero image */}
      {/* spinner and image layers are both mounted; opacity toggles for a micro transition */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute left-0 right-0 top-24 sm:top-32 z-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${imageVisible ? 'opacity-0' : 'opacity-100'}`}>
          <div className="spinner" aria-hidden="true" />
        </div>

        <div
          className={`absolute inset-0 z-0 pointer-events-none hero-bg transition-opacity duration-300 ${imageVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 10%',
            backgroundSize: 'auto 40%',
            filter: 'blur(0px)'
          }}
        />
      </div>
      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(-6px) scale(1); }
          50% { transform: translateY(6px) scale(1.01); }
          100% { transform: translateY(-6px) scale(1); }
        }
        .hero-bg {
          animation: heroFloat 10s ease-in-out infinite;
          transition: opacity 300ms linear, filter 300ms linear, transform 300ms linear;
        }
        .hero-bg:hover {
          opacity: 0.09 !important;
          filter: blur(1px);
        }
        .spinner {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 8px solid rgba(255,255,255,0.06);
          border-top-color: rgba(255,255,255,0.95);
          animation: spin 900ms linear infinite;
          box-shadow: 0 0 24px rgba(0,0,0,0.3) inset;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg { animation: none !important; }
        }
        .typing-caret { display:inline-block; width: 10px; animation: blink 1s steps(1) infinite; }
        @keyframes blink { 0%,49%{opacity:1}50%,100%{opacity:0} }
        /* eyes styling */
        .eye-socket { background: #ffffff; }
        .eye-pupil { transition: transform 140ms cubic-bezier(.2,.9,.2,1); box-shadow: 0 6px 18px rgba(0,0,0,0.4) inset; }
      `}</style>
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        


          {/* Research-style prompt (centered) with badge moved outside */}
          <div className="w-full flex justify-center mt-72 sm:mt-80">
            <div className="w-full sm:w-[520px] mx-auto relative">
              {/* badge positioned outside the card, aligned with card's left */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-primary text-xs md:text-sm tracking-wider uppercase border border-primary/30 rounded-full px-3 py-1 blue-glow">
                {roles[currentRole]}
              </span>
              <div className="w-full bg-[rgba(255,255,255,0.03)] border border-white/6 rounded-lg p-4 text-center">
                <div className="flex items-center justify-end mb-2 gap-2">
            <span className="text-xs text-muted-foreground">KindOfGPT</span>
                </div>
                <div className="bg-white/3 rounded-md p-4 min-h-[72px] flex items-center justify-center">
            <div className="text-base md:text-lg text-white font-mono break-words whitespace-normal overflow-hidden">
              {typedPrompt}
            </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 inset-x-0 flex justify-center pointer-events-none">
        <button onClick={() => scrollToSection("about")} className="pointer-events-auto flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group animate-float">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>;
};
export default Hero;