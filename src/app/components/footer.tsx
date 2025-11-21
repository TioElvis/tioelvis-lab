import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function Footer() {
  return (
    <footer className="my-16 border-t py-8">
      <MaxWidthWrapper className="flex flex-wrap gap-4 justify-between">
        <div className="space-y-2">
          <h2 className="text-primary text-2xl font-bold">TioElvis Lab</h2>
          <p className="text-muted-foreground text-sm">
            Building & documenting code, one project at a time
          </p>
          <p className="text-muted-foreground text-sm">
            Built with ❤️ and lots of ☕
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Contact</h3>
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
                  <Icon className="" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="my-6">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} TioElvis. All rights reserved.
        </p>
      </MaxWidthWrapper>
    </footer>
  );
}
