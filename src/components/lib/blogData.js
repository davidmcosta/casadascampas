import { sanityClient } from "./sanityClient";

export async function getAllBlogPosts() {
  try {
    const query = `*[_type == "blog"]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "authorName": author.name,
       "authorBio": author.authorBio,
      "authorImage": author.image.asset->url,
      "categories": categories[].title,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt
    }`;
    const results = await sanityClient.fetch(query);
    return results;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      content,
      "authorName": author.name,
       "authorBio": author.authorBio,
      "authorImage": author.image.asset->url,
      "categories": categories[].title,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      tags
    }`;

    const result = await sanityClient.fetch(query, { slug });

    return {
      post: result || null, 
      relatedPosts: [] 
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return { post: null, relatedPosts: [] };
  }
}