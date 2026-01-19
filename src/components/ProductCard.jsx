"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Share, Copy, Check } from 'lucide-react';
import { useStore } from "./lib/store";
import Toast from "./Toast";

export default function ProductCard({ product, productSlug, lang = "pt", onImageClick }) {
  const [showToast, setShowToast] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const { addToCart } = useStore();

  const selectedVariant = product.variants?.[selectedVariantIndex];
  const imageSrc = selectedVariant?.imageUrl || product.image;

  // Log product ID to console for verification
  useEffect(() => {
  }, [product.id, product.title]);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      image: imageSrc,
      variant: {
        color: selectedVariant?.color || null,
        imageUrl: selectedVariant?.imageUrl || null,
      },
    };

    addToCart(productToAdd);
    setShowToast(true);
  };

  const handleShareClick = () => {
    // Create shareable URL with product slug
    const shareUrl = `${window.location.origin}${window.location.pathname}?product=${productSlug}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden group">
          {/* Clickable Area */}
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => onImageClick(product)} // Use prop to open modal
          >
            <Image
              src={imageSrc || "/placeholder.svg?height=400&width=400"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 pointer-events-none"
            />
          </div>

          {/* Overlay for hover effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onClick={() => onImageClick(product)}
          />

          {/* Action Buttons - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              onClick={() => onImageClick(product)}
              className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              title={lang === "pt" ? "Ver detalhes" : "View details"}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 p-5 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium uppercase tracking-wider text-amberVar dark:text-amberhover">
              {product.category}
            </span>
          </div>
          <div className="flex flex-col h-full">
            {/* Title + Description */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-1">
                {product.description}
              </p>
            </div>

            {/* Price and Button at Bottom */}
            <div className="mt-auto flex items-center justify-between pt-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                €{product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-amberVar hover:bg-amberhover dark:bg-amberVar dark:hover:bg-amberhover text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md hover:shadow-amber-500/20"
                aria-label={`Add ${product.title} to cart`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{lang === "pt" ? "Adicionar" : "Add"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={`${product.title} ${lang === "pt" ? "adicionado ao carrinho!" : "added to cart!"}`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}