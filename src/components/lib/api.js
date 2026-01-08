import { sanityClient } from "./sanityClient.js"

// Common product fields query to avoid repetition
const productFields = `
  _id,
  title,
  description,
  price,
  vatRate,
  categories,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  variants[]{
    "imageUrl": image.asset->url,
    color
  },
  "thumbnailUrl": image.asset->metadata.lqip,
  "createdAt": _createdAt
`

async function getSanityProducts() {
  try {
    return await sanityClient.fetch(`*[_type == "product"]{${productFields}}`)
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error 
  }
}

function transformSanityProduct(sanityProduct) {
  if (!sanityProduct) return null
  
  return {
    id: sanityProduct._id,
    slug: sanityProduct.slug || "untitled-product",
    title: sanityProduct.title || "Untitled Product",
    description: sanityProduct.description || "No description available",
    price: sanityProduct.price || 0,
    image: sanityProduct.imageUrl || "/placeholder.svg",
    thumbnail: sanityProduct.thumbnailUrl,
    category: sanityProduct.categories || "Uncategorized",
    createdAt: sanityProduct.createdAt,
    vatRate: sanityProduct.vatRate || 0,
    variants: sanityProduct.variants || []
  }
}

export async function getProducts() {
  try {
    const sanityProducts = await getSanityProducts()
    return sanityProducts.map(transformSanityProduct)
  } catch (error) {
    console.error("Error in getProducts:", error)
    return []
  }
}

export async function getProduct(id) {
  try {
    const sanityProduct = await sanityClient.fetch(
      `*[_type == "product" && _id == $id][0]{${productFields}}`,
      { id } // Removed toString() - Sanity IDs are usually strings
    )
    return transformSanityProduct(sanityProduct)
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

export async function getProductsByCategory(category) {
  try {
    const sanityProducts = await sanityClient.fetch(
      `*[_type == "product" && category == $category]{${productFields}}`,
      { category }
    )
    return sanityProducts.map(transformSanityProduct)
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
}