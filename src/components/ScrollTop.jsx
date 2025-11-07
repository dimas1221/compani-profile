import React, { useEffect, useState } from "react";
import { IconChevronUp } from "./icons/InlineIcons";

export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setShow(y > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-6 z-50 p-3 rounded-full shadow-lg bg-primary-500 text-white fade-in"
    >
      <IconChevronUp />
    </button>
  );
}
