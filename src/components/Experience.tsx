import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Product Manager – Accessories",
      company: "Samsung Electronics - Milan,Italy",
      url: "https://www.samsung.com/it/",
      period: "Oct '25 - Present",
      description:
        "Supported data-driven product lifecycle management for wearable and mobile accessories, leveraging analytics to guide strategic decisions and portfolio optimization. My work included monitoring market and competitor insights to refine product strategy, as well as assisting with pre-launch and post-launch performance tracking and demand forecasting.",
      achievements: [],
    },
    {
      role: "Data Scientist and Product Developer",
      company: "Algoritmica.ai - Berlin, Germany",
      url: "https://algoritmica.ai/",
      period: "Nov '24 – Sept '25",
      description:
        "Designed AI-driven data solutions for document validation and Generative AI–based text analysis, working with Python, FastAPI, and PostgreSQL. I also implemented scalable ETL pipelines integrating BigQuery, GCS, and Docker to support automation and deployment. I initially joined the startup as a three-month intern and continued as a full-time team member.",
      achievements: [],
    },
    {
      role: "Data Analyst Intern",
      company: "Tinexta Group - Brescia, Italy",
      url: "https://www.tinexta.com/",
      period: "Jul '23 – Sep '23",
      description: "Conducted financial and statistical analyses to support budgeting and forecasting activities, improving the accuracy and efficiency of internal processes. Automated Excel-based reporting pipelines, reducing report generation time by 60%, and identified cost-saving and performance trends to inform strategic decision-making.",
      achievements: [
],
    },
  ];

  const education = [
    {
      degree: "M.Sc. in Data Analytics",
      institution: "University Ca'Foscari Venice",
      period: "Oct '23 - Oct '25",
      url: "https://www.unive.it/",
      description:
        "",
      research: {
        institution: "ETH Zurich",
        period: "Feb '25 - Aug '25",
        url: "https://ethz.ch/",
        description: "Research semester focused on computer vision applied to medical imaging.",
      },
    },
    {
      degree: "B.Sc. in Finance",
      institution: "University of Brescia",
      period: "Sep '19 - Oct '23",
      url: "https://www.unibs.it/",
      description: "",
    },
  ];
  return (
    <section id="experience" className="py-24 px-6 bg-black relative">
      {/* gradient strip overlaps previous section for a smooth transition */}
      <div className="-mt-12 h-12 w-full bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="container mx-auto max-w-6xl">

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left column - Education */}
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-white mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <span>Education</span>
              </div>
            </div>
            <div className="space-y-6">
              {education.map((ed, i) => (
                <div
                  key={`${ed.institution}-${i}`}
                  className="relative pl-8 pb-4 border-l-2 border-primary/30 last:border-l-0 animate-slide-up"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -ml-[5px] bg-primary blue-glow transform rotate-45" />

                  <div className="bg-black border border-border rounded-xl p-4 relative hover:border-primary/50 transition-all duration-300 hover:blue-glow">
                    <div className="mb-2">
                      <h4 className="text-xl font-bold text-white">{ed.degree}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                          {ed.url ? (
                            <a
                              href={ed.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground text-sm hover:text-blue-400 hover:underline"
                              aria-label={`Visit ${ed.institution}`}
                            >
                              {ed.institution}
                            </a>
                          ) : (
                            <div className="text-muted-foreground text-sm">{ed.institution}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-blue-500 text-sm">
                          <Calendar className="h-3 w-3 text-blue-500" />
                          <span className="font-medium text-sm">{ed.period}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs">{ed.description}</p>
                    {ed.research && (
                      <div className="mt-3 pt-3 border-t border-border/40">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                            {ed.research.url ? (
                              <a
                                href={ed.research.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground text-sm hover:text-blue-400 hover:underline"
                                aria-label={`Visit ${ed.research.institution}`}
                              >
                                {ed.research.institution}
                              </a>
                            ) : (
                              <div className="text-muted-foreground text-sm">{ed.research.institution}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-blue-500 text-sm">
                            <Calendar className="h-3 w-3 text-blue-500" />
                            <span className="font-medium text-sm">{ed.research.period}</span>
                          </div>
                        </div>
                        {ed.research.description && (
                          <p className="text-muted-foreground text-sm mt-2">{ed.research.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Work Experience */}
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-white mb-6">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span>Work Experience</span>
              </div>
            </div>
            <div className="space-y-8">
              {experiences.map((exp, index) => (

                <div
                  key={exp.company}
                  className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 last:pb-0 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -ml-[5px] bg-primary blue-glow transform rotate-45" />

                  <div className="bg-black border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:blue-glow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4 text-blue-500" />
                          {exp.url ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground text-sm hover:text-blue-400 hover:underline"
                              aria-label={`Visit ${exp.company}`}
                            >
                              {exp.company}
                            </a>
                          ) : (
                            <span className="text-sm">{exp.company}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Calendar className="h-3 w-3 text-blue-500" />
                          <span className="font-medium text-sm text-blue-500">{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-2 text-sm">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span className="text-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* bottom gradient that fades into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Experience;
