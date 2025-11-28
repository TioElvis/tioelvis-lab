import { useEffect, useRef } from "react";

export function useKeyboardAware() {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = container.current;

    if (!element || typeof window === "undefined") return;

    const applyViewportOffset = () => {
      const v = (window as Window).visualViewport;
      if (v) {
        const viewportHeight = v.height;
        const layoutHeight = window.innerHeight;
        const keyboardHeight = Math.max(0, layoutHeight - viewportHeight);

        element.style.paddingBottom = `${keyboardHeight}px`;

        const active = document.activeElement as HTMLElement | null;
        if (active && element.contains(active)) {
          setTimeout(() => {
            try {
              active.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {}
          }, 50);
        }
      } else {
        element.style.paddingBottom = "";
      }
    };

    const v = (window as Window).visualViewport;
    if (v) {
      v.addEventListener("resize", applyViewportOffset);
      v.addEventListener("scroll", applyViewportOffset);
    }
    window.addEventListener("resize", applyViewportOffset);

    applyViewportOffset();

    return () => {
      if (v) {
        v.removeEventListener("resize", applyViewportOffset);
        v.removeEventListener("scroll", applyViewportOffset);
      }
      window.removeEventListener("resize", applyViewportOffset);

      if (element) element.style.paddingBottom = "";
    };
  }, [container]);

  return container;
}
