export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,               
   token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true
}
