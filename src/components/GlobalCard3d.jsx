// import React, { useRef } from "react";

// export default function GlobalCard3d({ children, className = "" }) {
//   const cardRef = useRef(null);

//   const handleMove = (e) => {
//     const card = cardRef.current;
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const midX = rect.width / 2;
//     const midY = rect.height / 2;

//     const rotateX = (-(y - midY) / midY) * 15;
//     const rotateY = ((x - midX) / midX) * 15;

//     const lightX = ((x / rect.width) * 100).toFixed(2);
//     const lightY = ((y / rect.height) * 100).toFixed(2);

//     card.style.setProperty("--light-x", `${lightX}%`);
//     card.style.setProperty("--light-y", `${lightY}%`);

//     card.style.transform = `
//       perspective(1200px)
//       rotateX(${rotateX}deg)
//       rotateY(${rotateY}deg)
//       scale(1.04)
//     `;
//   };

//   const reset = () => {
//     const card = cardRef.current;
//     if (!card) return;

//     card.style.transform =
//       "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseMove={handleMove}
//       onMouseLeave={reset}
//       className={`
//         relative
//         transition-transform duration-300 ease-out
//         will-change-transform
//         rounded-2xl
//         bg-white/10 dark:bg-white/5
//         backdrop-blur-md
//         shadow-[0px_10px_30px_rgba(0,0,0,0.25)]
//         border border-white/10
//         transform-style-preserve-3d
//         contain-paint
//         ${className}
//       `}
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {/* LIGHT */}
//       <div
//         className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
//         style={{
//           background: `
//             radial-gradient(
//               circle at var(--light-x) var(--light-y),
//               rgba(255,255,255,0.6),
//               transparent 70%
//             )
//           `,
//           transform: "translateZ(20px)",
//         }}
//       />

//       {/* EDGE SHADOW (no overflow-hidden needed!) */}
//       <div
//         className="pointer-events-none absolute inset-0 rounded-2xl"
//         style={{
//           boxShadow: "inset 0 0 25px rgba(0,0,0,0.25)",
//           transform: "translateZ(10px)",
//         }}
//       />

//       {/* CHILDREN */}
//       <div
//       // className="relative z-10"
//       // style={{
//       //   transform: "translateZ(30px)",
//       //   transformStyle: "preserve-3d",
//       // }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

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

    const lightX = ((x / rect.width) * 100).toFixed(2);
    const lightY = ((y / rect.height) * 100).toFixed(2);

    card.style.setProperty("--light-x", `${lightX}%`);
    card.style.setProperty("--light-y", `${lightY}%`);

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
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
        bg-white/10 dark:bg-white/5
        backdrop-blur-md
        shadow-[0px_15px_40px_rgba(0,0,0,0.25)]
        border border-white/10
        transform-style-preserve-3d
        contain-paint
        mx-auto select-none
        ${className}
      `}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* LIGHT */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        style={{
          background: `
            radial-gradient(
              circle at var(--light-x) var(--light-y),
              rgba(255,255,255,0.55),
              transparent 70%
            )
          `,
          transform: "translateZ(20px)",
        }}
      />

      {/* EDGE SHADOW */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: "inset 0 0 28px rgba(0,0,0,0.28)",
          transform: "translateZ(10px)",
        }}
      />

      {/* CONTENT */}
      <div>{children}</div>
    </div>
  );
}
