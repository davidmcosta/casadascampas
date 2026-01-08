"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Share, Check } from "lucide-react";

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt, 
  title, 
  description, 
  children, 
  productId,
  lang = "en",
  productSlug,
  variants // Added variants prop
}) {
  const [copied, setCopied] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0); // Moved state here

  const currentImageSrc = variants?.[selectedVariantIndex]?.imageUrl || imageSrc;
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

const handleShareClick = () => {
  const slugToUse = productSlug || "NO_SLUG"; // test ke liye placeholder
  const shareUrl = `${window.location.origin}${window.location.pathname}?product=${slugToUse}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
  <div 
    className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" 
    onClick={onClose} 
  />

  <div className="relative bg-white dark:bg-gray-900 max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden shadow-2xl animate-fade-in">
    {/* Header with share button and close button */}
    <div className="absolute top-2 right-4 flex gap-2 z-10">
      {/* Share Button */}
      <button
        onClick={handleShareClick}
        className="px-3 py-1 bg-amberVar hover:bg-amberhover text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center gap-1"
        title={lang === "pt" ? "Copiar link" : "Copy link"}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share className="w-4 h-4" />
        )}
         <span>
                {copied 
                  ? (lang === "pt" ? "Copiado!" : "Copied!") 
                  : (lang === "pt" ? "Compartilhar" : "Share")
                }
              </span>
      </button>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="bg-amberVar hover:bg-amberhover text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <X className="w-4 h-4" />
      </button>
    </div>

    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto h-auto lg:h-auto bg-white dark:bg-gray-900 rounded-lg">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
        <div className="relative w-full h-full aspect-square sm:aspect-video md:aspect-[4/3] lg:aspect-square">
          <Image
            src={currentImageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            className="object-contain transition-opacity duration-300 hover:opacity-90"
          />
        </div>
      </div>

      {/* Text Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col border-l border-gray-300 dark:border-gray-700">
        <div className="p-6 overflow-y-auto w-full max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]">
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap px-2">
            {variants?.map((variant, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Image Thumbnail */}
                <button
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`p-1 rounded-full transition-all ${
                    selectedVariantIndex === index
                      ? "ring-2 ring-amberVar"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                    <Image
                      src={variant?.imageUrl || "/placeholder.svg?height=56&width=56"}
                      alt={`${title} - ${variant.color}`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                <span className="text-xs sm:text-sm mt-1 text-gray-700 dark:text-gray-300 capitalize">
                  {variant?.color}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            
            {/* Share button for mobile */}
            <button
              onClick={handleShareClick}
              className="mt-6 lg:hidden flex items-center gap-2 px-4 py-2 bg-amberVar hover:bg-amberhover text-white rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share className="w-4 h-4" />
              )}
              <span>
                {copied 
                  ? (lang === "pt" ? "Copiado!" : "Copied!") 
                  : (lang === "pt" ? "Compartilhar" : "Share")
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}