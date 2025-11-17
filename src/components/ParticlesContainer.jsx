import React, { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useApp } from "../context/AppContext";
// import context

const ParticlesContainer = () => {
  const { darkMode } = useApp(); // ambil darkMode dari context

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const lightColors = {
    particleColor: "#e68e2e",
    linkColor: "#f5d393",
  };

  const darkColors = {
    particleColor: "#7f9cf5",
    linkColor: "#a3bffa",
  };

  const colors = darkMode ? darkColors : lightColors;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: colors.particleColor },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
          links: {
            enable: true,
            distance: 150,
            color: colors.linkColor,
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false },
            resize: true,
          },
          modes: {
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesContainer;
