const LogoTicker = () => {
  // You can add SVGs to `public/logos/` and reference them via `logoSrc`.
  // Example: put `google.svg` into `public/logos/google.svg` and set logoSrc: '/logos/google.svg'
  // Optional `size` (height in px) lets you control each logo's display size.
  const companies: { name: string; logoSrc?: string; size?: number }[] = [
    { name: "Samsung", logoSrc: "/logos/Samsung_Orig_Wordmark_WHITE_RGB.png", size: 50 },
    { name: "ETH Zurich", logoSrc: "/logos/eth_logo_kurz_neg.png", size: 60 },
    { name: "Tinexta", logoSrc: "/logos/Tinexta_Neg_Whi_CMYK-1-Photoroom.png", size: 100 },
    { name: "Algoritmica.ai", logoSrc: "/logos/b8cab-algoritmica_logo_retina_w.png", size: 30 },
    { name: "Wallmart", logoSrc: "/logos/WMT-Wordmark-Small-TrueBlue-White-RGB.svg", size: 30 },
    { name: "Ca'Foscari", logoSrc: "/logos/cafoscari.png", size: 100 },
  ];

  return (
    <section className="py-8 border-y border-border overflow-hidden bg-card/30">
      <div className="relative">
        <div className="flex gap-16 items-center animate-scroll">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center min-w-[200px] text-muted-foreground hover:text-primary transition-colors text-xl font-semibold whitespace-nowrap"
            >
              {company.logoSrc ? (
                <img
                  src={company.logoSrc}
                  alt={company.name}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    // Hide the broken image and show the company name as text fallback
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) parent.textContent = company.name;
                  }}
                  style={{ height: company.size ? `${company.size}px` : undefined }}
                  className="w-auto object-contain filter grayscale opacity-80 hover:filter-none hover:opacity-100 transition-all"
                />
              ) : (
                company.name
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogoTicker;
