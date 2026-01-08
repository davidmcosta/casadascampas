"use client"
import { sanityClient } from './sanityClient';

// Fetch gallery items from Sanity
export async function getSanityGalleryItems() {
  try {
    const galleryItems = await sanityClient.fetch(`*[_type == "gallery"]{
      _id,
      title,
      category,
      "image": image.asset->url,
      alt,
      description,
      material,
      color,
      price,
      features,
      rating,
      reviews
    }`);
    return galleryItems;
  } catch (error) {
    console.error("Error fetching gallery items from Sanity:", error);
    return []; 
  }
}

