import { useEffect, useRef } from "react";

const NAME = "ABIN MATHEW";

function scatteredTransform() {
  const x = (Math.random() - 0.5) * 720;
  const y = (Math.random() - 0.5) * 520;
  const z = (Math.random() - 0.5) * 640;
  const rotX = (Math.random() - 0.5) * 220;
  const rotY = (Math.random() - 0.5) * 220;
  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

export function KineticTypographyLoader({ onFinished }) {
  const loaderTextRef = useRef(null);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  useEffect(() => {
    const loaderText = loaderTextRef.current;
    if (!loaderText) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    loaderText.textContent = "";

    if (reduceMotion) {
      loaderText.textContent = NAME;
      const done = window.setTimeout(() => onFinishedRef.current?.(), 500);
      return () => window.clearTimeout(done);
    }

    const chars = NAME.split("").map((char, index) => {
      const span = document.createElement("span");
      span.className = "kinetic-char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--transform-from", scatteredTransform());
      span.style.animationName = "fly-in";
      span.style.animationDelay = `${index * 0.05}s`;
      loaderText.appendChild(span);
      return span;
    });

    const flyOutTimeout = window.setTimeout(() => {
      chars.forEach((span, index) => {
        span.style.setProperty("--transform-to", scatteredTransform());
        span.style.animationName = "none";
        void span.offsetWidth;
        span.style.animationName = "fly-out";
        span.style.animationDelay = `${(chars.length - 1 - index) * 0.04}s`;
      });
    }, 2000);

    const doneTimeout = window.setTimeout(() => {
      onFinishedRef.current?.();
    }, 2000 + chars.length * 40 + 950);

    return () => {
      window.clearTimeout(flyOutTimeout);
      window.clearTimeout(doneTimeout);
    };
  }, []);

  return (
    <div className="kinetic-loader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div ref={loaderTextRef} className="kinetic-loader-text" />
    </div>
  );
}
