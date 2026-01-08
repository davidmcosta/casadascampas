"use client";

import { getDictionary } from '@/app/[lang]/dictionaries';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amberVar" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialCard = ({ quote, author, location }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
    <blockquote className="text-blackVar italic mb-6">
      &quot;{quote}&quot;
    </blockquote>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3" />
      <div>
        <p className="font-medium text-gray-900">{author}</p>
        <p className="text-sm text-blackVar">{location}</p>
      </div>
    </div>
  </div>
);

function Testimonials() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [t, setT] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "testimonials");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading testimonials dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  if (!t) {
    return null; 
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 mx-0">
      <div className="mx-0 px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-blackDark">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-blackVar max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-0">
          {t.testimonials?.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
