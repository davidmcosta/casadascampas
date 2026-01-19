"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeroSkeleton from "./Skeleton.jsx";
import { usePathname } from "next/navigation.js";
import { getHomeData } from "./lib/getHomeData.js";
import AnimatedStat from "./AnimatedStat.jsx"

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const lang = pathname.split("/")[1];

  const startDate = new Date("2020-01-01"); // substitui pela data real do início do negócio
const today = new Date();
const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

// Stats atuais
const stats = [
  { value: "32", label: "Anos" }, // fixo
  { value: 500 + 7 * daysPassed, label: "Obras" }, // aumenta 7 por dia
  { value: "100%", label: "Artesanal" } // fixo
];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeData();
        setHero({
          heading: data.heading,
          highlightedWord: data.highlightedWord,
          description: data.description,
          image: data.backgroundImage?.asset?.url,
          PButtonLink: data.primaryButtonLink,
          ButtonText: data.primaryButtonText,
          SButtonLink: data.secondaryButtonLink,
          secondaryButtonText: data.secondaryButtonText,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load hero data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <HeroSkeleton />;

  if (error)
    return (
      <section className="relative h-[60vh] bg-blackDark flex items-center justify-center">
        <div className="text-white">{error}</div>
      </section>
    );

  return (
    <section
  className="relative bg-blackDark pt-24 sm:pt-24 lg:pt-20 pb-10 sm:pb-10 lg:pb-8 flex flex-col justify-center items-center min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]"
>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {hero?.image && (
          <Image
            src={hero.image}
            alt="Professional funeral monuments and memorial stones crafted with artistic excellence"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            className="opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-amberopacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-amberVar/30 via-amberVar/20 to-amberhover/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 z-10 relative text-center">
        {/* Heading */}
        {hero?.heading && hero?.highlightedWord && (
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
          >
            {hero.heading.split(hero.highlightedWord)[0]}{" "}
            <span className="text-amberVar">
              {hero.highlightedWord}
            </span>
            {hero.heading.split(hero.highlightedWord)[1]}
          </h1>
        )}

        {/* Description */}
        <p
          className="text-sm sm:text-base md:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
        >
          {hero.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6">
  {stats.map(stat => (
    <AnimatedStat
      key={stat.label}
      value={stat.value.toString()} // importante converter para string
      label={stat.label}
    />
  ))}
</div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${lang}/products`}
            className="group inline-flex items-center justify-center bg-gradient-to-r from-amberVar to-amberhover hover:from-amberhover hover:to-amberVar text-white text-base sm:text-lg px-6 py-3 rounded-md sm:rounded-lg transition-all duration-500 shadow-2xl hover:shadow-amberVar/40 transform hover:-translate-y-1 w-full sm:w-auto"
            aria-label="Explore o nosso catálogo"
          >
            <span className="flex-1 text-center sm:text-left">
              Descobrir
            </span>
            <ArrowRightIcon />
          </Link>

          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center justify-center border-2 border-white/50 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-blackVar text-base sm:text-lg px-6 py-3 rounded-md sm:rounded-lg transition-all duration-500 w-full sm:w-auto hover:shadow-xl transform hover:-translate-y-1"
            aria-label="Solicitar Orçamento"
          >
            <span className="flex-1 text-center sm:text-left">
              Solicitar Orçamento
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;