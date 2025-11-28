import {
  ChevronDownIcon,
  Code2Icon,
  FileCodeIcon,
  FolderIcon,
  GithubIcon,
  LinkedinIcon,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <main>
      {/* Header */}
      <header className="fixed w-full h-16 z-50 bg-background/80 backdrop-blur-sm border-b">
        <MaxWidthWrapper className="flex items-center justify-between">
          <span className="font-bold text-sm uppercase">tioelvis lab</span>
          <nav className="flex gap-2">
            <Button className="text-sm" asChild>
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <ModeToggle />
          </nav>
        </MaxWidthWrapper>
      </header>
      {/* Hero */}
      <section className="relative min-h-192 flex items-center justify-center overflow-hidden bg-linear-to-b from-background via-primary/5 to-background">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
          <div className="absolute inset-0 bg-[linear-gradient(var(--primary)_1px,transparent_1px),linear-gradient(90deg,var(--primary)_1px,transparent_1px)] bg-size-[50px_50px] opacity-5" />
        </div>
        {/* Content */}
        <MaxWidthWrapper className="relative z-10 text-center space-y-8">
          <Badge className="bg-primary/10 border border-primary/30 px-4 py-2 text-sm">
            👨‍💻 Developer & Technical Writer
          </Badge>
          <h1 className="text-primary">Hi, I&#39;m TioElvis</h1>
          <h4 className="text-muted-foreground max-w-2xl mx-auto">
            I build projects in JavaScript, Python, C, and more — then write
            about how I did it, step by step.
          </h4>
          <Button className="px-8 py-4 h-12" asChild>
            <Link href="/projects">Explore Projects</Link>
          </Button>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: "Projects Built", value: "0" },
              { name: "Languages", value: "0" },
              { name: "Coffee Cups", value: "∞", isPrimary: true },
            ].map(({ name, value, isPrimary }) => (
              <div key={name} className="py-4 text-muted-foreground">
                <h3 className={cn(isPrimary && "text-primary")}>{value}</h3>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        <div className="absolute bottom-1/12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="w-6 h-6 text-primary" />
        </div>
      </section>
      {/* About */}
      <MaxWidthWrapper className="relative my-16 bg-background space-y-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">What is TioElvis Lab?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I work on coding projects across multiple languages and
                frameworks. Each project is a real-world challenge that teaches
                me something new.
              </p>
              <p>
                What makes <b>TioElvis Lab</b> unique is how I document the
                process. I break down development into organized sections
                (Setup, Features, Deploy, etc.), showing the real journey, not
                just the final result.
              </p>
              <p>
                My goal is to show the actual development process, including
                challenges and solutions. Perfect for developers who want to see
                how things are really built, step by step.
              </p>
            </div>
          </div>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
            </CardHeader>
            <CardContent className="px-12 space-y-2">
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
                <CardTitle>{item.step}</CardTitle>
              </CardHeader>
              <CardContent>
                <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </MaxWidthWrapper>
      {/* Footer */}
      <footer className="my-16 border-t py-8">
        <MaxWidthWrapper className="flex flex-wrap gap-4 justify-between">
          <div className="space-y-2">
            <h3 className="text-primary">TioElvis Lab</h3>
            <p className="text-muted-foreground">
              Building & documenting code, one project at a time
            </p>
            <p className="text-muted-foreground">
              Built with ❤️ and lots of ☕
            </p>
          </div>
          <div className="space-y-2">
            <h3>Contact</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  href: "https://github.com/TioElvis",
                  icon: GithubIcon,
                },
                {
                  href: "https://www.linkedin.com/in/elvis-vera-3657ba365/",
                  icon: LinkedinIcon,
                },
              ].map(({ href, icon: Icon }) => (
                <Button size="icon" variant="outline" asChild key={href}>
                  <Link href={href} target="_blank">
                    <Icon />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="my-8">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} TioElvis. All rights reserved.
          </p>
        </MaxWidthWrapper>
      </footer>
    </main>
  );
}
