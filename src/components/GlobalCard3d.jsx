import React, { useRef } from "react";

export default function GlobalCard3d({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = (-(y - midY) / midY) * 15;
    const rotateY = ((x - midX) / midX) * 15;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`
        relative
        transition-transform duration-300 ease-out
        will-change-transform
        rounded-2xl sm:rounded-3xl
        bg-transparent
        border border-white/10
        mx-auto select-none
        overflow-hidden
        ${className}
      `}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* CONTENT — tidak ada shadow, tidak ada blur, tidak ada overlay */}
      <div className="relative w-full h-auto">{children}</div>
    </div>
  );
}
