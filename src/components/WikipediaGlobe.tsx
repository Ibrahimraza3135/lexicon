import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

export default function WikipediaGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const animFrameId = useRef<number | null>(null);

  // Smooth floating & idle rotation when not dragging
  useEffect(() => {
    let idleAngle = 0;
    const animate = () => {
      if (!isDragging) {
        // Decay velocity (inertia)
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        if (Math.abs(velocity.current.x) < 0.001) velocity.current.x = 0;
        if (Math.abs(velocity.current.y) < 0.001) velocity.current.y = 0;

        idleAngle += 0.005;

        setRotation((prev) => ({
          x: prev.x * 0.96 + Math.sin(idleAngle * 0.8) * 1.5 + velocity.current.y,
          y: prev.y * 0.96 + Math.cos(idleAngle * 0.6) * 2.5 + velocity.current.x,
        }));
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
    lastMousePos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocity.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      // Subtle 3D perspective tilt towards mouse cursor
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        setRotation({
          x: -normY * 12,
          y: normX * 16,
        });
      }
      return;
    }

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    const now = performance.now();
    const dt = Math.max(1, now - lastMousePos.current.time);
    velocity.current = {
      x: ((e.clientX - lastMousePos.current.x) / dt) * 8,
      y: ((e.clientY - lastMousePos.current.y) / dt) * 8,
    };
    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    setRotation({
      x: Math.max(-25, Math.min(25, dragStart.current.rotX - deltaY * 0.3)),
      y: Math.max(-35, Math.min(35, dragStart.current.rotY + deltaX * 0.3)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      dragStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        rotX: rotation.x,
        rotY: rotation.y,
      };
      lastMousePos.current = { x: touch.clientX, y: touch.clientY, time: performance.now() };
      velocity.current = { x: 0, y: 0 };
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.current.x;
    const deltaY = touch.clientY - dragStart.current.y;

    const now = performance.now();
    const dt = Math.max(1, now - lastMousePos.current.time);
    velocity.current = {
      x: ((touch.clientX - lastMousePos.current.x) / dt) * 8,
      y: ((touch.clientY - lastMousePos.current.y) / dt) * 8,
    };
    lastMousePos.current = { x: touch.clientX, y: touch.clientY, time: now };

    setRotation({
      x: Math.max(-25, Math.min(25, dragStart.current.rotX - deltaY * 0.3)),
      y: Math.max(-35, Math.min(35, dragStart.current.rotY + deltaX * 0.3)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none cursor-grab active:cursor-grabbing group [perspective:1000px]"
      title="Interactive Wikipedia Puzzle Globe"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/10 via-slate-200/20 to-blue-500/10 filter blur-3xl -z-10 animate-pulse pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-amber-500/10 scale-95 pointer-events-none transition-transform duration-700 group-hover:scale-100" />
      <div className="absolute inset-0 rounded-full border border-dashed border-gray-300/30 scale-90 pointer-events-none animate-[spin_80s_linear_infinite]" />

      {/* 3D Transformable Globe Container */}
      <div
        className="w-full h-full relative flex items-center justify-center transition-transform duration-100 ease-out will-change-transform drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isDragging ? 1.04 : 1.0})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Authentic Wikipedia 3D Puzzle Globe Vector */}
        <img
          src="/wikipedia-globe.svg"
          alt="Wikipedia Puzzle Globe"
          draggable={false}
          className="w-[92%] h-[92%] object-contain pointer-events-none filter drop-shadow-sm select-none"
        />

        {/* Subtle glass reflection overlay to enhance 3D realism */}
        <div
          className="absolute inset-[6%] rounded-full pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
