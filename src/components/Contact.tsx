import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/LoreJob", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lorenzo-muscillo-09b4b9263/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lorenzo.muscillo.job@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in space-y-8">
          <h2 className="text-4xl md:text-4xl font-bold mb-4">
            Let's Work <span className="text-primary text-glow">Together</span>
          </h2>
          <p className="text-xl text-white max-w-xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. Feel free to
            reach out!
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="lg"
                    className="border border-white/10 !text-white hover:bg-gray/10 hover:border-white/20 transition-colors rounded-lg px-6 py-3"
                    onClick={() => window.open(social.href, "_blank", "noopener,noreferrer")}
                  >
                    <span className="flex items-center justify-center gap-2 !text-white">
                      <span className="font-medium !text-white">{social.label}</span>
                      <Icon className="h-5 w-5 ml-2 text-current" />
                    </span>
                  </Button>
              );
            })}
          </div>

          {/* primary CTA removed — using social links above */}
        </div>

        <footer className="mt-24 pt-8 border-t border-border text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lorenzo. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
