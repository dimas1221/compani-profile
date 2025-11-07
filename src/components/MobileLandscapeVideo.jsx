import React, { useEffect, useState } from "react";

export default function MobileLandscapeVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    function checkOrientation() {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;

      setShowVideo(isMobile && isLandscape);
    }

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!showVideo) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-live="polite"
      role="alert"
    >
      <video
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
