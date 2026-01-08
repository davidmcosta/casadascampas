"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";



// Check icon component
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-amberVar mr-2 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

function FeaturedProduct() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [t, setT] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "featured");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  const sectionHeader = t?.featuredProduct0 || {};
  const productList = Object.values(t || {}).filter((item) => item?.id);

  return (
    <section
      className="py-10 bg-gray-50"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        letterSpacing: "0.01em",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "sans-serif",
              letterSpacing: "-0.015em",
              wordSpacing: "0.02em",
            }}
          >
            {sectionHeader.title || "Featured Products"}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{
              lineHeight: "1.6",
              letterSpacing: "0.01em",
              wordSpacing: "0.01em",
            }}
          >
            {sectionHeader.description ||
              "Our finest selection of funeral art and products."}
          </p>
        </div>

        {/* Products Grid */}
        {productList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productList.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                console.log(product.id +", " + product.name)
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={product.image || "/fallback.jpg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  console.log(""-+product.image);
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1"
                    style={{
                      fontFamily: "sans-serif",
                      letterSpacing: "-0.015em",
                      wordSpacing: "0.02em",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    className="text-gray-600 text-sm mb-4 line-clamp-2"
                    style={{
                      letterSpacing: "0.01em",
                      wordSpacing: "0.01em",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {product.features?.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckIcon />
                        <span
                          className="text-sm text-gray-700"
                          style={{
                            letterSpacing: "0.01em",
                            wordSpacing: "0.01em",
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No featured products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProduct;
