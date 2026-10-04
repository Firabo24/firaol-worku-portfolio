import React, { useEffect, useRef } from 'react';
import { useOrbitContext } from '@/providers/OrbitProvider';

export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isResonating } = useOrbitContext();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle restrained star / telemetry particle points
    const count = Math.min(50, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.6,
      baseAlpha: Math.random() * 0.4 + 0.15,
      alpha: 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#090e18');
      bgGrad.addColorStop(0.5, '#060810');
      bgGrad.addColorStop(1, '#040509');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle mouse radial illumination vignette
      if (mouseRef.current.x > 0 || mouseRef.current.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          380
        );
        mouseGlow.addColorStop(0, 'rgba(6, 182, 212, 0.035)');
        mouseGlow.addColorStop(0.7, 'rgba(6, 182, 212, 0.008)');
        mouseGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw faint particles
      const now = performance.now() * 0.001;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const alphaMod = prefersReducedMotion
          ? p.baseAlpha
          : p.baseAlpha + Math.sin(now * 2 + p.twinklePhase) * 0.12;

        ctx.fillStyle = `rgba(186, 230, 253, ${Math.max(0.05, alphaMod)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic 2D canvas for space and particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Fine technical engineering grid */}
      <div className="absolute inset-0 tech-grid opacity-35" />

      {/* Outer corner technical telemetry marks */}
      <div className="absolute top-4 left-6 text-[10px] font-mono-tech text-zinc-600/70 select-none tracking-widest hidden sm:block">
        POS: 37°46'N // 122°25'W · SYS_FREQ: 60Hz
      </div>
      <div className="absolute bottom-4 right-6 text-[10px] font-mono-tech text-zinc-600/70 select-none tracking-widest hidden sm:block">
        ORBIT_GRID: CARTESIAN · SCALE: 1.00x
      </div>

      {/* Subtle scanline overlay for atmospheric technical feel */}
      <div className="absolute inset-0 orbit-scanlines opacity-20 pointer-events-none" />

      {/* Vignette border */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />

      {/* Pulse wave resonance shockwave when Core is triggered */}
      {isResonating && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-cyan-500/30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
