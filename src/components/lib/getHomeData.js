// /lib/getHeroData.js
import { sanityClient } from "./sanityClient.js";

export async function getHomeData() {
  try {
    const data = await sanityClient.fetch(`*[_type == "home"][0]{
      backgroundImage{
        asset->{
          _id,
          url
        }
      },
      heading,
      highlightedWord,
      description,
      stats[] {
        value,
        label
      },
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }`)

    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null; 
  }
}
