"use client"
import React, { JSX, useEffect, useState } from 'react';
import Image from 'next/image';

import Hero from '@/components/Hero';
import AboutPage from '@/components/AboutPage';
import Testimonials from '@/components/Testimonials';
import BlogAccordion from '@/components/Blog';
import FeaturedProduct from '@/components/FeaturedProduct';
import { usePathname } from 'next/navigation';
import { getDictionary } from './dictionaries';



export default function Home() {
   const pathname = usePathname();
    const lang = (pathname?.split("/")[1] as "en" | "pt") || "pt";
    type Feature = { icon: 'award' | 'shield' | 'heart'; title: string; description: string };
    type Section = {
      title: string;
      features?: Feature[];
      image?: { src: string; alt: string };
    };
    type Dictionary = {
      section?: Section;
      [key: string]: unknown;
    };
    const [t, setT] = useState<Dictionary | null>(null);
  
 
    useEffect(() => {
      const loadDictionary = async () => {
        try {
          const dict = await getDictionary(lang, "chooseUs");
          setT(dict || {});
        } catch (error) {
          console.error("Error loading dictionary:", error);
          setT({});
        }
      };
      loadDictionary();
    }, [lang]);



  const FeatureIcon = ({ icon }: { icon: 'award' | 'shield' | 'heart' }) => {
    const icons: { [key in 'award' | 'shield' | 'heart']: JSX.Element } = {
      award: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amberhover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      shield: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amberhover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      heart: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amberhover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    };

    return (
      <div className="w-12 h-12 bg-amberVar bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-amberVar group-hover:shadow-lg">
        {icons[icon]}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
    <BlogAccordion/>
      {/* Featured Products */}
    <FeaturedProduct/>

      {/* Why Choose Us */}
    {t?.section && (
  <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 mx-0">
    <div className="px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Section */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-blackDark">
              {t.section.title}
            </h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {t.section.features?.map((feature: { icon: 'award' | 'shield' | 'heart'; title: string; description: string }, index: number) => (
              <div key={index} className="flex items-start group">
                <FeatureIcon icon={feature.icon} />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blackDark">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative order-1 lg:order-2">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={t.section.image?.src || "/fallback.jpg"}
              alt={t.section.image?.alt || "Image"}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              33vw"
              style={{ objectFit: 'cover' }}
              className="rounded-2xl transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blackDark to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
)}


      {/* Testimonials */}
    <Testimonials/>

      {/* Contact CTA */}
      <AboutPage/>
    </div>
  );
}
