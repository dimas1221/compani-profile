// CounterStat.jsx
import React, { useEffect, useRef, useState } from "react";
import { Smile, Briefcase, Users, Award } from "lucide-react";

const icons = {
  happyClients: <Smile className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-500" />,
  projects: <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-sky-500" />,
  members: <Users className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500" />,
  awards: <Award className="w-4 h-4 sm:w-6 sm:h-6 text-pink-500" />,
};

export default function CounterStat({
  value = 0,
  duration = 1200,
  label = "",
  iconKey = "",
}) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let start = null;
    const from = 0;
    const to = Number(value) || 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const pct = Math.min(progress / duration, 1);
      const current = Math.floor(from + (to - from) * pct);
      setCount(current);
      if (progress < duration) {
        startRef.current = requestAnimationFrame(step);
      }
    };

    startRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(startRef.current);
  }, [value, duration]);

  return (
    <div
      className="
        flex flex-col items-center justify-center
        p-1 rounded-md
        min-w-[50px] max-w-[75px]
        transition-transform duration-200 hover:scale-[1.05]
      "
    >
      <div className="mb-0.5">{icons[iconKey]}</div>
      <div className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white drop-shadow-sm leading-tight">
        {count.toLocaleString()}
      </div>
      <div className="mt-0.25 text-[9px] sm:text-xs text-gray-600 dark:text-gray-300 font-medium text-center leading-tight">
        {label}
      </div>
    </div>
  );
}
