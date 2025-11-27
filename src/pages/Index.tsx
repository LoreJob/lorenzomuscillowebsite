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
