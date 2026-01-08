import { sanityClient } from "./sanityClient.js";

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`;

  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null; 
  }
}
