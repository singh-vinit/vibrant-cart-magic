import React, { useState, useEffect, useCallback } from "react";

const slides = [
  {
    title: "Up to 80% Off on Fashion",
    subtitle: "Trendy styles at unbeatable prices",
    gradient: "from-primary to-primary/80",
  },
  {
    title: "New Electronics Arrivals",
    subtitle: "Latest gadgets & accessories",
    gradient: "from-secondary to-secondary/80",
  },
  {
    title: "Free Delivery on First Order",
    subtitle: "Shop now and save on shipping",
    gradient: "from-secondary via-primary to-primary/80",
  },
];

const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`min-w-full h-48 sm:h-64 md:h-80 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r ${slide.gradient}`}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-lg text-primary-foreground/80">{slide.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
