import { useEffect, useState } from "react";

function AnimatedStat({ value, label, duration = 2500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    // Remove símbolos para animar corretamente
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(numericValue)) return;

    const increment = numericValue / (duration / 16); // 16ms ~ 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        start = numericValue;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  // Sufixo correto (+ ou %)
  const suffix = value.includes("+") ? "+" : value.includes("%") ? "%" : "";

  return (
    <div className="text-center min-w-[70px]">
      <div
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amberVar"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
      >
        {count}{suffix}
      </div>
      <div
        className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300"
        style={{ textShadow: "0 1px 5px rgba(0,0,0,0.8)" }}
      >
        {label}
      </div>
    </div>
  );
}

export default AnimatedStat;
