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

    const rotateX = (-(y - midY) / midY) * 18; // stronger 3D
    const rotateY = ((x - midX) / midX) * 18;

    card.style.transform = `
      perspective(1600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.07)
    `;
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`
        transition-transform duration-300 ease-out 
        will-change-transform
        ${className}
      `}
    >
      {children}
    </div>
  );
}
