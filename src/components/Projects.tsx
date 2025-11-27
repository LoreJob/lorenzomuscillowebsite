import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

import ethImg from "../../images/eththesis.webp";
import deepfakeImg from "../../images/Screenshot 2025-11-27 at 9.37.10 PM.png";
import logisticImg from "../../images/Screenshot 2025-11-27 at 9.35.57 PM.png";
import greenhouseImg from "../../images/Screenshot 2025-11-26 at 10.11.53 AM.png";
import healthImg from "../../images/healthdataanalytiucs.webp";
import deeploansImg from "../../images/deeploans.png";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  repo?: string;
};

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Medical Computer Vision ETH Zürich",
      description:
        "CNN Based model for medical image analysis, achieving high accuracy in diabetes detection and classification.",
      tech: ["Python", "Scikit-learn", "PyTorch"],
      image: ethImg,
      repo: "https://github.com/LoreJob/diabetic-foot-classification-rgb-ir",
    },
    {
      title: "Deepfake Detection Tool",
      description:
        "Neural network capable of reliably detecting deepfake images and videos to strengthen digital media authenticity and security",
      tech: ["Python", "Scikit-learn", "PyTorch", "Tensorflow"],
      image: deepfakeImg,
      repo: "https://github.com/LoreJob/DeepFake-Dct",
    },
    {
      title: "Logistic Optimization",
      description:
        "Analyzed optimal store locations—demonstrated with a Walmart-style example—using web scraping, geolocation APIs, and curvature-aware distance calculations to generate adaptable insights that require real world validation for practical application.",
      tech: ["Python", "Pyomo", "Gurobi", "API"],
      image: logisticImg,
      repo:"https://github.com/LoreJob/Logistic-Problem-Walmart"
    },
        {
      title: "Greenhouse Gasses in EU Countries",
      description:
        "Analyzes 30 years of greenhouse gas emissions to explore their correlation with GDP",
      tech: ["Python", "R Studio"],
      image: greenhouseImg,
      repo: "https://github.com/LoreJob/GREENHOUSE-GASES-EMISSIONS-IN-EU-27",
    },
    {
      title: "Practical Dive into Medical Analytics",
      description:
        "This project explores real-world health datasets to apply statistical analysis, visualization, and machine-learning techniques for uncovering meaningful clinical insights.",
      tech: ["R Studio"],
      image: healthImg,
      repo: "https://github.com/LoreJob/Health-Data-Science-Project",
    },
    {
      title: "DeepLoans",
      description:
        "An end-to-end deep learning pipeline that predicts borrower risk and automates loan decisioning by training models on borrower and loan data while providing explainable outputs.",
      tech: ["Next.js", "Tailwind", "MongoDB", "AWS S3"],
      image: deeploansImg,
      repo: "https://github.com/Algoritmica-ai/deeploans",
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Arrow-only scrolling: no pointer-drag handlers (removed for keyboard/arrow navigation)

  return (
    <section id="projects" className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-4xl md:text-4xl font-semibold leading-none text-primary tracking-tight">
              Projects
            </h2>
            <p className="text-lg text-white max-w-2xl mt-6">
              A selection of my recent work and side projects
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Constrained wrapper: keep carousel inside the page container width */}
          <div className="relative mx-auto w-full">
            <button
              aria-label="Previous projects"
              className="carousel-arrow carousel-left hidden md:inline-flex"
              onClick={() => {
                if (!scrollRef.current) return;
                const card = scrollRef.current.querySelector('.project-card');
                const gap = 24;
                const w = card ? (card as HTMLElement).getBoundingClientRect().width : scrollRef.current.clientWidth / 3;
                scrollRef.current.scrollBy({ left: -(w + gap), behavior: 'smooth' });
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={(el) => (scrollRef.current = el)}
              className="horizontal-scroll no-fade flex snap-x gap-6 px-4 md:px-6 overflow-x-auto"
            >
              {projects.map((project, index) => (
                <a
                  key={project.title}
                  href={project.repo || `https://github.com/search?q=${encodeURIComponent(project.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} repository`}
                      className="group snap-start project-card flex-shrink-0 w-[85vw] md:w-1/3 rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="relative h-72 md:h-[380px] overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* dark gradient overlay starting from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                    {/* title + description in bottom-left */}
                    <div className="absolute left-4 right-4 bottom-4 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">{project.title}</h3>
                      <p className="mt-2 text-sm md:text-base text-white/80 line-clamp-3">{project.description}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* clickable overlay to ensure full-card hover/active state */}
                    <span className="absolute inset-0" aria-hidden />
                  </div>
                </a>
              ))}
            </div>

            <button
              aria-label="Next projects"
              className="carousel-arrow carousel-right hidden md:inline-flex"
              onClick={() => {
                if (!scrollRef.current) return;
                const card = scrollRef.current.querySelector('.project-card');
                const gap = 24;
                const w = card ? (card as HTMLElement).getBoundingClientRect().width : scrollRef.current.clientWidth / 3;
                scrollRef.current.scrollBy({ left: (w + gap), behavior: 'smooth' });
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
