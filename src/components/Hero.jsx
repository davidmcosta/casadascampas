"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import HeroSkeleton from './Skeleton.jsx'
import { usePathname } from 'next/navigation.js';
import { getHomeData } from "./lib/getHomeData.js";


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeData();
        // Usa apenas os dados do Sanity, sem traduções
        setHero({
          heading: data.heading,
          highlightedWord: data.highlightedWord,
          description: data.description,
          image: data.backgroundImage?.asset?.url,
          PButtonLink: data.primaryButtonLink,
          ButtonText: data.primaryButtonText,
          SButtonLink: data.secondaryButtonLink,
          secondaryButtonText: data.secondaryButtonText
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
    <section className="relative h-[70vh] sm:h-[55vh] md:h-[50vh] lg:h-[55vh] xl:h-[70vh] bg-blackDark flex items-center overflow-hidden" style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      letterSpacing: '0.01em'
    }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {hero && <Image
          src={hero?.image}
          alt="Professional funeral monuments and memorial stones crafted with artistic excellence"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="opacity-50"
        />}
        {/* Black Overlay Filter - 70% opacity */}
        <div className="absolute inset-0 bg-amberopacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-amberVar/30 via-amberVar/20 to-amberhover/30" />
      </div>

      {/* Floating Animation Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-amberVar/10 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-amberVar/5 rounded-full blur-lg sm:blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 z-10 relative py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
        <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <div className="w-12 sm:w-14 md:w-16 lg:w-20 h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-amberVar to-amberhover mb-2 sm:mb-2 md:mb-2 lg:mb-2 animate-slideIn"></div>

          {hero?.heading && hero?.highlightedWord ? (
            <h1
              className="text-lg sm:text-xl lg:mt-16 md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 sm:mb-2 md:mb-2 lg:mb-2 leading-tight animate-fadeInUp"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.02em",
                wordSpacing: "0.02em",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              }}
            >
              {hero.heading.split(hero.highlightedWord)[0]}&nbsp;
              <span className="bg-gradient-to-r from-amberVar to-amberhover bg-clip-text text-transparent">
                {hero.highlightedWord}
              </span>
              {hero.heading.split(hero.highlightedWord)[1]}
            </h1>
          ) : null}


          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-4 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed animate-fadeInUp delay-200" style={{
            lineHeight: '1.6',
            letterSpacing: '0.01em',
            wordSpacing: '0.02em',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>{hero.description}</p>

          {/* Stats */}
          <div className="flex flex-wrap justify-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 mb-2 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 animate-fadeInUp delay-300">
            <div className="text-center min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-amberVar" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>30+</div>
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.8)' }}>Anos</div>
            </div>
            <div className="text-center min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-amberVar" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>1000+</div>
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.8)' }}>Obras</div>
            </div>
            <div className="text-center min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-amberVar" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>100%</div>
              <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.8)' }}>Artesanal</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 animate-fadeInUp delay-400">
            <Link
              href={`/${lang}/products`}
              className="group inline-flex items-center justify-center bg-gradient-to-r from-amberVar to-amberhover hover:from-amberhover hover:to-amberVar text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-2 rounded-md sm:rounded-lg transition-all duration-500 shadow-2xl hover:shadow-2xl hover:shadow-amberVar/40 transform hover:-translate-y-1 w-full sm:w-auto min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px]"
              style={{
                fontWeight: 600,
                letterSpacing: '0.025em',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
              aria-label="Explore o nosso catálogo"
            >
              <span className="flex-1 text-center sm:text-left">{/* {hero.ButtonText} */}Descobrir</span>
              <ArrowRightIcon />
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center justify-center border-2 border-white/50 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-blackVar text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-2 rounded-md sm:rounded-lg transition-all duration-500 hover:border-white w-full sm:w-auto hover:shadow-xl transform hover:-translate-y-1 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px]"
              style={{
                fontWeight: 600,
                letterSpacing: '0.025em',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}
              aria-label="Get free quote for custom funeral monuments"
            >
              <span className="flex-1 text-center sm:text-left">{/* {hero.secondaryButtonText} */}Solicitar Orçamento</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default Hero
