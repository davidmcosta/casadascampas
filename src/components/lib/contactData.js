"use client";
import { sanityClient } from "./sanityClient";

export async function getSanityContactInfo() {
  try {
    const contactInfo = await sanityClient.fetch(`*[_type == "contact"]{
      _id,
      address,
      email,
      phone,
      whatsapp,
      "hours": hours[]{
        days,
        time
      },
      mapLocation {
        lat,
        lng
      }
    }`);
    return contactInfo;
  } catch (error) {
    console.error("Error fetching contact info from Sanity:", error);
    return [];
  }
}
