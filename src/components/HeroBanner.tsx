import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    eyebrow: "Spring edit",
    title: "Curated finds for the way you actually shop.",
    subtitle: "Fashion, decor, and gadgets lined up in one calm, fast storefront.",
    gradient: "from-[#214038] via-[#32584f] to-[#4b7d71]",
    accent: "New textures, light layers, and everyday essentials.",
  },
  {
    eyebrow: "Tech refresh",
    title: "Upgrade the desk, the bag, and the weekend setup.",
    subtitle: "Low-friction picks with standout pricing and zero clutter.",
    gradient: "from-[#201f2d] via-[#34426f] to-[#5575b6]",
    accent: "Portable audio, clean accessories, and sharper everyday gear.",
  },
  {
    eyebrow: "Home stories",
    title: "Small changes that make the room feel finished.",
    subtitle: "Furniture and accents selected to add warmth without the overwhelm.",
    gradient: "from-[#4d3024] via-[#8c4b34] to-[#c96b39]",
    accent: "Soft neutrals, tactile materials, and cheerful accents.",
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
    <section className="relative overflow-hidden rounded-[2rem] border border-white/30 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_28%)]" />
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className={`min-w-full bg-gradient-to-br ${slide.gradient}`}>
            <div className="grid min-h-[30rem] gap-10 px-6 py-10 text-primary-foreground sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-14">
              <div className="flex flex-col justify-between">
                <div className="space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-foreground/75">
                    {slide.eyebrow}
                  </p>
                  <div className="max-w-2xl space-y-4">
                    <h1 className="max-w-xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="max-w-lg text-base text-primary-foreground/78 sm:text-lg">
                      {slide.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/products">
                      <Button size="lg" className="rounded-full bg-white px-7 text-secondary hover:bg-white/90">
                        Shop the collection
                      </Button>
                    </Link>
                    <Link to="/products?maxPrice=499">
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-white/40 bg-white/10 px-7 text-white hover:bg-white/15"
                      >
                        Budget picks
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid max-w-xl gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-3xl font-semibold">40+</p>
                    <p className="text-sm text-primary-foreground/72">fresh listings loaded for discovery</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">24h</p>
                    <p className="text-sm text-primary-foreground/72">deal cadence with rotating highlights</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">Voice</p>
                    <p className="text-sm text-primary-foreground/72">search-ready for quick product jumps</p>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-center lg:justify-end">
                <div className="w-full max-w-md rounded-[1.75rem] border border-white/15 bg-black/12 p-5 shadow-2xl backdrop-blur-sm">
                  <div className="space-y-4 rounded-[1.35rem] bg-white/10 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.26em] text-primary-foreground/65">
                        This moment
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs">Editor&apos;s note</span>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-[1.2rem] bg-white/95 p-4 text-secondary">
                        <p className="text-xs uppercase tracking-[0.22em] text-secondary/60">Mood</p>
                        <p className="mt-2 text-lg font-semibold">{slide.accent}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-[1.1rem] bg-white/10 p-4">
                          <p className="text-primary-foreground/65">Top categories</p>
                          <p className="mt-1 font-medium">Style, tech, living</p>
                        </div>
                        <div className="rounded-[1.1rem] bg-white/10 p-4">
                          <p className="text-primary-foreground/65">Best for</p>
                          <p className="mt-1 font-medium">Quick gifting</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 flex gap-2 lg:left-14">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
