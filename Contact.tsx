import { Github, Linkedin, Mail } from "lucide-react";
// If your components folder is at project root (next to Contact.tsx)
import { Button } from "./components/ui/button";

// If you prefer the "@/components/..." alias, ensure tsconfig.json / jsconfig.json contains:
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": { "@/*": ["./*"] }
//   }
// }

const Contact = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lorenzo.muscillo.job@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work <span className="text-primary text-glow">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  className="border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5 mr-2" />
                    {social.label}
                  </a>
                </Button>
              );
            })}
          </div>

          <div className="pt-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground blue-glow text-lg px-12"
              asChild
            >
              <a href="mailto:lorenzo.muscillo.job@gmail.com">Get in Touch</a>
            </Button>
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-border text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lorenzo Muscillo. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
