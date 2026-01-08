"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSanityContactInfo } from "./lib/contactData";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ContactSkeleton from "../components/contactSkeleton";
import Head from "next/head";



const ContactIcon = ({ icon }) => {
  const icons = {
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-amberhover group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-amberhover group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-amberVar bg-opacity-20 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-amberhover transition-all duration-300 flex-shrink-0">
      {icons[icon]}
    </div>
  );
};

export default function AboutPage() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [t, setT] = useState(null);

  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "pt";

  useEffect(() => {
    async function fetchContact() {
      setLoading(true);
      const data = await getSanityContactInfo();
      if (Array.isArray(data) && data.length > 0) {
        setContact(data[0]);
      }
      setLoading(false);
    }
    fetchContact();
  }, []);

  useEffect(() => {
    async function loadDictionary() {
      try {
        const dict = await getDictionary(lang, "aboutPage");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    }
    loadDictionary();
  }, [lang]);

  return (
    <>
      {t && (
        <Head>
          <title>{`${t.title} ${t.highlight}`}</title>
          <meta name="description" content={t.description} />
          <meta property="og:title" content={`${t.title} ${t.highlight}`} />
          <meta property="og:description" content={t.description} />
          <meta property="og:image" content="/images/img12.jpg" />
        </Head>
      )}

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-blackVar text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blackVar via-blackdark to-blackVar opacity-90" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                {t?.title}{" "}
                <span className="bg-gradient-to-r from-amberVar to-amberhover bg-clip-text text-transparent">
                  {t?.highlight}
                </span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed">
                {t?.description}
              </p>

              {loading ? (
                <ContactSkeleton />
              ) : (
                contact && (
                  <div className="space-y-4">
                    <a href={contact?.phone} className="flex items-center group">
                      <ContactIcon icon="phone" />
                      <span className="font-medium">{t?.phoneLabel}: {contact?.phone}</span>
                    </a>
                    <a href={`mailto:${contact?.email}`} className="flex items-center group">
                      <ContactIcon icon="mail" />
                      <span className="font-medium">{t?.emailLabel}: {contact?.email}</span>
                    </a>
                  </div>
                )
              )}
            </div>

           {/* Image Section */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] rounded-lg lg:rounded-l-2xl lg:rounded-r-none overflow-hidden shadow-2xl group">
              <Image 
                src="/images/img12.jpg"
                alt={t?.imageAlt || "About image"} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blackVar/60 via-transparent to-transparent" />
              
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-amberVar/20 rounded-lg lg:rounded-l-2xl lg:rounded-r-none" />

            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-amberVar to-amberhover text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
              <div className="text-xs sm:text-sm font-bold">{t?.badge.years}</div>
              <div className="text-[10px] sm:text-xs opacity-90">{t?.badge.experience}</div>
            </div>
          </div>
        
          </div>
        </div>
      </section>
    </>
  );
}
