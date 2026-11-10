import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * VaporType
 * "Words that condense out of vapor and drift away"
 *
 * Simulates atmospheric vapor/mist particles condensing into sharp typography,
 * resting with ambient edge wisps and fluid interactive dispersion, then
 * dissolving and drifting away like smoke into the air.
 */
export default function VaporType({
  text = "",
  words = null,
  className = "",
  style = {},
  as: Component = "span",
  condenseDuration = 1800,
  holdDuration = 3800,
  driftDuration = 1600,
  cycle = false,
  interactive = true,
  step = 2,
  color = null,
  ariaLabel,
}) {
  const wordList = words && words.length > 0 ? words : [text];
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = wordList[wordIndex % wordList.length] || "";

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isHovering: false });

  // Handle word cycling if enabled
  useEffect(() => {
    if ((cycle || (words && words.length > 1)) && wordList.length > 1) {
      const totalCycle = condenseDuration + holdDuration + driftDuration;
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % wordList.length);
      }, totalCycle);
      return () => clearInterval(interval);
    }
  }, [cycle, words, wordList.length, condenseDuration, holdDuration, driftDuration]);

  // Main canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !currentWord) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Detect theme color dynamically
    const computedStyles = window.getComputedStyle(container);
    const resolvedColor =
      color ||
      computedStyles.getPropertyValue("--text-primary").trim() ||
      computedStyles.color ||
      "#ffffff";

    // Typography metrics
    const fontSizeStr = computedStyles.fontSize || "16px";
    const fontSize = parseFloat(fontSizeStr) || 16;
    const fontFamily =
      computedStyles.fontFamily ||
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const fontWeight = computedStyles.fontWeight || "700";
    const letterSpacing = computedStyles.letterSpacing || "normal";
    const textTransform = computedStyles.textTransform || "none";

    let displayWord = currentWord;
    if (textTransform === "uppercase") displayWord = displayWord.toUpperCase();
    else if (textTransform === "lowercase") displayWord = displayWord.toLowerCase();
    else if (textTransform === "capitalize") {
      displayWord = displayWord.replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Set font for measurement
    const fontSpec = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Offscreen canvas to render text and sample pixels
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.font = fontSpec;
    if (letterSpacing && letterSpacing !== "normal") {
      try {
        offCtx.letterSpacing = letterSpacing;
      } catch (e) {
        // letterSpacing might not be supported in all offscreen contexts
      }
    }

    const metrics = offCtx.measureText(displayWord);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(fontSize * 1.35);

    // Add vapor drift buffer around the text
    const padX = Math.max(30, Math.ceil(fontSize * 0.8));
    const padY = Math.max(24, Math.ceil(fontSize * 0.7));
    const totalW = textWidth + padX * 2;
    const totalH = textHeight + padY * 2;

    canvas.width = Math.round(totalW * dpr);
    canvas.height = Math.round(totalH * dpr);
    canvas.style.width = `${totalW}px`;
    canvas.style.height = `${totalH}px`;
    canvas.style.marginLeft = `-${padX}px`;
    canvas.style.marginRight = `-${padX}px`;
    canvas.style.marginTop = `-${padY}px`;
    canvas.style.marginBottom = `-${padY}px`;

    offCanvas.width = Math.round(totalW * dpr);
    offCanvas.height = Math.round(totalH * dpr);
    offCtx.scale(dpr, dpr);
    offCtx.font = fontSpec;
    if (letterSpacing && letterSpacing !== "normal") {
      try {
        offCtx.letterSpacing = letterSpacing;
      } catch (e) {}
    }
    offCtx.fillStyle = "#ffffff";
    offCtx.textBaseline = "middle";
    offCtx.fillText(displayWord, padX, padY + textHeight * 0.48);

    // Sample pixels
    const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imgData.data;
    const sampleStep = Math.max(1, Math.round(step * dpr));

    const particles = [];
    const ambientWisps = [];

    // Parse base color components (RGB)
    let rgb = { r: 255, g: 255, b: 255 };
    if (resolvedColor.startsWith("#")) {
      const hex = resolvedColor.replace("#", "");
      if (hex.length === 3) {
        rgb = {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16),
        };
      } else if (hex.length >= 6) {
        rgb = {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
        };
      }
    } else if (resolvedColor.startsWith("rgb")) {
      const parts = resolvedColor.match(/\d+/g);
      if (parts && parts.length >= 3) {
        rgb = {
          r: parseInt(parts[0], 10),
          g: parseInt(parts[1], 10),
          b: parseInt(parts[2], 10),
        };
      }
    }

    for (let y = 0; y < offCanvas.height; y += sampleStep) {
      for (let x = 0; x < offCanvas.width; x += sampleStep) {
        const idx = (y * offCanvas.width + x) * 4;
        const alpha = data[idx + 3];
        if (alpha > 70) {
          const targetX = x / dpr;
          const targetY = y / dpr;

          // Random vapor cloud dispersion
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * 65;
          const startX = targetX + Math.cos(angle) * dist;
          const startY = targetY + Math.sin(angle) * dist * 0.6 + 10;

          particles.push({
            originX: startX,
            originY: startY,
            x: startX,
            y: startY,
            targetX,
            targetY,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: (0.7 + Math.random() * 1.3) * (fontSize / 16),
            baseAlpha: (alpha / 255) * (0.75 + Math.random() * 0.25),
            alpha: 0.05,
            seed: Math.random() * 100,
            driftVx: (Math.random() - 0.5) * 1.2,
            driftVy: -0.4 - Math.random() * 1.4,
          });
        }
      }
    }

    // Atmospheric ambient wisps that float continually around the name
    const wispCount = Math.min(25, Math.max(10, Math.floor(particles.length / 45)));
    for (let i = 0; i < wispCount; i++) {
      ambientWisps.push({
        x: padX + Math.random() * textWidth,
        y: padY + Math.random() * textHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45,
        size: (1.2 + Math.random() * 2.2) * (fontSize / 16),
        alpha: 0.15 + Math.random() * 0.25,
        maxAlpha: 0.25 + Math.random() * 0.2,
        seed: Math.random() * 50,
      });
    }

    const startTime = performance.now();
    let isCancelled = false;

    // Animation frame loop
    const render = (now) => {
      if (isCancelled) return;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Phase calculation
      const isCondensing = elapsed < condenseDuration;
      const isHolding =
        elapsed >= condenseDuration && elapsed < condenseDuration + holdDuration;
      const isDrifting = elapsed >= condenseDuration + holdDuration;

      const condenseProgress = Math.min(1, elapsed / condenseDuration);
      // Smooth cubic-out easing for natural vapor condensation
      const easeCondense = 1 - Math.pow(1 - condenseProgress, 3);

      const driftProgress = isDrifting
        ? Math.min(1, (elapsed - (condenseDuration + holdDuration)) / driftDuration)
        : 0;

      const mouse = mouseRef.current;
      const mouseRadius = 45;

      // Update & Draw text particles
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        if (isCondensing) {
          // Condensing from vapor cloud toward target letters
          const targetLerpX = p.originX + (p.targetX - p.originX) * easeCondense;
          const targetLerpY = p.originY + (p.targetY - p.originY) * easeCondense;

          // Gentle smoky wobble during condensation
          const wobble = Math.sin(now * 0.003 + p.seed) * (1 - easeCondense) * 2;
          p.x += (targetLerpX - p.x) * 0.18 + wobble * 0.05;
          p.y += (targetLerpY - p.y) * 0.18 + wobble * 0.05;
          p.alpha = 0.05 + (p.baseAlpha - 0.05) * easeCondense;
        } else if (isHolding) {
          // Settled on letters with subtle organic breathing
          const microWobbleX = Math.sin(now * 0.002 + p.seed) * 0.18;
          const microWobbleY = Math.cos(now * 0.002 + p.seed) * 0.18;
          p.x += (p.targetX + microWobbleX - p.x) * 0.25;
          p.y += (p.targetY + microWobbleY - p.y) * 0.25;
          p.alpha = p.baseAlpha;

          // Interactive cursor displacement (waving through smoke)
          if (interactive && mouse.isHovering) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 14;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        } else if (isDrifting) {
          // Vaporizing and drifting away
          p.driftVy -= 0.04;
          const curl = Math.sin(now * 0.004 + p.seed) * 0.65;
          p.x += p.driftVx * 1.2 + curl;
          p.y += p.driftVy;
          p.alpha = Math.max(0, p.baseAlpha * (1 - driftProgress * 1.2));
        }

        if (p.alpha > 0.01) {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update & Draw ambient vapor wisps
      if (!isDrifting || driftProgress < 0.6) {
        const wLen = ambientWisps.length;
        for (let i = 0; i < wLen; i++) {
          const w = ambientWisps[i];
          w.y += w.vy;
          w.x += w.vx + Math.sin(now * 0.003 + w.seed) * 0.35;
          w.alpha *= 0.99;

          // Reset wisp when it floats away
          if (w.alpha < 0.02 || w.y < padY - 20) {
            w.x = padX + Math.random() * textWidth;
            w.y = padY + Math.random() * textHeight;
            w.alpha = w.maxAlpha;
            w.vy = -0.2 - Math.random() * 0.45;
          }

          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${w.alpha * (1 - driftProgress)})`;
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Loop or pause
      const totalDuration = condenseDuration + holdDuration + driftDuration;
      if (cycle || elapsed < totalDuration) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Mouse interaction handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - padX,
        y: e.clientY - rect.top - padY,
        isHovering: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isHovering: false };
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      isCancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [
    currentWord,
    condenseDuration,
    holdDuration,
    driftDuration,
    cycle,
    interactive,
    step,
    color,
  ]);

  return (
    <Component
      ref={containerRef}
      className={`vapor-type-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        verticalAlign: "middle",
        ...style,
      }}
      aria-label={ariaLabel || currentWord}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: "block",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
      <span className="sr-only" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
        {currentWord}
      </span>
    </Component>
  );
}

