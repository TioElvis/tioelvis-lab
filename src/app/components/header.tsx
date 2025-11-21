import { ModeToggle } from "@/components/mode-toggle";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function Header() {
  return (
    <header className="fixed h-16 top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <MaxWidthWrapper className="flex items-center justify-between">
        <span className="font-bold uppercase text-muted-foreground">
          tioelvis laboratory
        </span>
        <ModeToggle />
      </MaxWidthWrapper>
    </header>
  );
}
