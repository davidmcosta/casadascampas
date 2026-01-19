"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { usePathname, notFound } from 'next/navigation';
import { getDictionary } from '../dictionaries';
import StyledTitle from "../../../components/StyledTitle"

export default function AboutPage() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || 'pt';
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      setLoading(true);
      try {
        const dict = await getDictionary(lang, "about");
        if (!dict || Object.keys(dict).length === 0) {
          notFound(); // redireciona para a 404 nativa do Next.js
          return;
        }
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      } finally {
        setLoading(false);
      }
    };
    loadDictionary();
  }, [lang]);

  if (loading || t === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-2 border-amberVar border-t-transparent mx-auto mb-4"
            aria-label="Loading"
          />
          <p className="text-blackVar">Loading...</p>
        </div>
      </div>
    );
  }

  const {
    title = '',
    metaTitle = '',
    metaDescription = '',
    ogImage = '',
    companyHistory = '',
    mission = '',
    highlights = [],
    teamMembers = [],
    heroImage = '',
    heroImageAlt = '',
    story = '',
    ctaButtonContact = 'Contact',
    ctaButtonProducts = 'Products',
    ctaText = '',
    ctaTitle = '',
    title1 = '',
    whyChooseUsTitle = '',
    teamTitle = ''
  } = t;

  const translatedTitle = t.title2;
  const words = translatedTitle.split(' ');
  const firstWords = words.join(' '); // "A nossa"
  const lastWord = words.pop(); // "Missão"
  

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle || title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://casadascampas.pt/${pathname}`} />
        <meta name="keywords" content="about us, company history, our team" />
      </Head>

      <main className="min-h-screen bg-white font-sans">
        {/* Hero Section */}
        <header className="relative bg-blackVar text-white py-16 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blackVar via-black/90 to-black/70" />
          <div className="absolute inset-0">
            {heroImage && (
              <Image
                src={heroImage}
                alt={heroImageAlt || "About Us"}
                fill
                className="object-cover opacity-30"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              />
            )}
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-amberVar">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
              {story}
            </p>
            <div className="w-24 h-1 bg-amberVar mx-auto mt-6" />
          </div>
        </header>

        {/* Company History */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blackVar text-center mb-6">
              <StyledTitle text={t.title1} />
            </h2>
            <div className="w-16 h-1 bg-amberVar mx-auto mb-8" />
            <div className="prose prose-lg max-w-none text-gray-700">
              {(companyHistory || '').split('\n').map((p, i) => (
                <p key={i} className="mb-4 md:mb-6">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}


        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <StyledTitle text={t.title2} />
            <div className="w-16 h-1 bg-amberVar mx-auto mb-8" />
            <blockquote className="max-w-2xl mx-auto bg-white p-6 md:p-8 shadow-md text-lg text-gray-800 rounded-lg">
              <span className="text-4xl leading-3 text-amberVar">"</span>
              <span className="px-2">{mission}</span>
              <span className="text-4xl leading-3 text-amberVar">"</span>
            </blockquote>
          </div>
        </section>

        {/* Highlights */}
        {Array.isArray(highlights) && highlights.length > 0 && (
          <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="text-center mb-12">
                <StyledTitle text={t.title3} />
                <div className="w-16 h-1 bg-amberVar mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-2xl bg-amberVar text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      {h.icon}
                    </div>
                    <h3 className="text-xl font-bold text-blackVar text-center mb-3">
                      {h.title}
                    </h3>
                    <p className="text-gray-700 text-center">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Team */}
        {Array.isArray(teamMembers) && teamMembers.length > 0 && (
          <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-12">
                <StyledTitle text={t.title4} />
                <div className="w-16 h-1 bg-amberVar mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, i) => (
                  <div 
                    key={i} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.image}
                        alt={member.alt || `${member.name} profile`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-blackVar text-xl mb-1">
                        {member.name}
                      </h3>
                      <p className="text-amberVar text-sm font-medium mb-3">
                        {member.position}
                      </p>
                      <p className="text-gray-700 text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-12 md:py-16 lg:py-20 bg-blackVar text-white">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {ctaTitle}
            </h2>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              {ctaText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href={`/${lang}/contact`} 
                className="bg-amberVar hover:bg-amberhover text-blackVar px-6 py-3 rounded-lg font-bold transition-colors duration-300"
                aria-label="Contact us"
              >
                {ctaButtonContact}
              </a>
              <a 
                href={`/${lang}/products`} 
                className="border-2 border-amberVar hover:bg-amberVar/10 text-amberVar px-6 py-3 rounded-lg font-bold transition-colors duration-300"
                aria-label="View our products"
              >
                {ctaButtonProducts}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}