import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-background via-primary/5 to-background px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--primary)_1px,transparent_1px),linear-gradient(90deg,var(--primary)_1px,transparent_1px)] bg-size-[50px_50px] opacity-5" />
      </div>
      {/* Content */}
      <MaxWidthWrapper className="relative z-10 text-center space-y-8">
        <Badge className="bg-primary/10 border border-primary/30 px-4 py-2">
          <span className="text-sm text-muted-foreground">
            👨‍💻 Developer & Technical Writer
          </span>
        </Badge>
        <h1 className="text-6xl md:text-7xl font-bold text-primary">
          Hi, I&#39;m TioElvis
        </h1>
        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I build projects in JavaScript, Python, C, and more — then write about
          how I did it, step by step.
        </p>
        <Button className="px-8 py-4 h-12 cursor-pointer" asChild>
          <Link href="/projects">Explore Projects</Link>
        </Button>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/50">
          <div className="py-4 text-muted-foreground">
            <div className="text-3xl md:text-4xl font-bold">0</div>
            <div className="text-sm">Projects Built</div>
          </div>
          <div className="py-4 text-muted-foreground">
            <div className="text-3xl md:text-4xl font-bold">0</div>
            <div className="text-sm">Languages</div>
          </div>
          <div className="py-4 text-muted-foreground">
            <div className="text-3xl md:text-4xl font-bold text-primary">∞</div>
            <div className="text-sm">Coffee Cups</div>
          </div>
        </div>
      </MaxWidthWrapper>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
}
