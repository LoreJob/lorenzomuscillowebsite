import Navigation from "@/components/Navigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageDots from "@/components/PageDots";
import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import RevealSection from "@/components/RevealSection";

const Index = () => {
  return (
    <div className="min-h-screen">
        <title>Lorenzo Muscillo – AI Engineer & Data Scientist</title>
        <meta
          name="description"
          content="Portfolio of Lorenzo Muscillo: AI, Data Science, Machine Learning, software development, academic projects, and professional work."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="AI Engineer, Data Scientist, Machine Learning, Deep Learning, Portfolio, ETH Zurich, AI Projects, Next.js, React, TypeScript"
        />

        {/* Author */}
        <meta name="author" content="Lorenzo Muscillo" />

        {/* Open Graph */}
        <meta property="og:title" content="Lorenzo Muscillo | AI Engineer & Data Scientist" />
        <meta
          property="og:description"
          content="AI and Data Science work by Lorenzo Muscillo."
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://lorenzomuscillo.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

      <Navigation />
      <PageDots />
      <ErrorBoundary>
        <RevealSection>
          <Hero />
        </RevealSection>

        <RevealSection>
          <LogoTicker />
        </RevealSection>

        <RevealSection>
          <About />
        </RevealSection>

        <RevealSection>
          <Experience />
        </RevealSection>

        <RevealSection>
          <Skills />
        </RevealSection>

        <RevealSection>
          <Projects />
        </RevealSection>

        <RevealSection>
          <Contact />
        </RevealSection>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
