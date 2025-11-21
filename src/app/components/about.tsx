"use client";
import { useEffect, useRef, useState } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code2Icon, FileCodeIcon, FolderIcon, RocketIcon } from "lucide-react";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MaxWidthWrapper
      ref={sectionRef}
      className="relative my-32 bg-background space-y-24">
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What is TioElvis Lab?
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I work on coding projects across multiple languages and
              frameworks. Each project is a real-world challenge that teaches me
              something new.
            </p>
            <p>
              What makes <b>TioElvis Lab</b> unique is how I document the
              process. I break down development into organized sections (Setup,
              Features, Deploy, etc.), showing the real journey, not just the
              final result.
            </p>
            <p>
              My goal is to show the actual development process, including
              challenges and solutions. Perfect for developers who want to see
              how things are really built, step by step.
            </p>
          </div>
        </div>
        <Card className="gap-2">
          <CardHeader>Project Structure</CardHeader>
          <CardContent className="pl-12 space-y-2">
            {[
              "Setup & Configuration",
              "Core Features Implementation",
              "Authentication & Security",
              "Database & Storage",
              "Testing & Debugging",
              "Deployment & Production",
            ].map((section, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground">
                <FolderIcon className="w-4 h-4" />
                <span>{section}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="grid lg:grid-cols-3 gap-8">
        {[
          {
            icon: Code2Icon,
            title: "Build",
            description:
              "I work on real projects using various programming languages and frameworks",
            step: "01",
          },
          {
            icon: FileCodeIcon,
            title: "Document",
            description:
              "Break down the development process into organized sections (Setup, Features, Deploy, etc.)",
            step: "02",
          },
          {
            icon: RocketIcon,
            title: "Share",
            description:
              "Publish detailed guides that show exactly how everything was built",
            step: "03",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all group">
            <CardHeader className="absolute bg-primary rounded-full -top-4 -left-4 w-12 h-12 flex items-center justify-center text-primary-foreground font-heading font-bold shadow-glow-primary">
              {item.step}
            </CardHeader>
            <CardContent>
              <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-heading font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </MaxWidthWrapper>
  );
}
