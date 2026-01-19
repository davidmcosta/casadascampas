"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { getBlogPostBySlug } from "../../../components/lib/blogData";
import {
  Share2,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  Heart,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { getDictionary } from "../dictionaries";
import { pl } from "date-fns/locale";

// Skeleton Components
const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
  <div
    className={`${width} ${height} bg-gray-200 rounded-full animate-pulse`}
  ></div>
);

const SkeletonImage = () => (
  <div className="w-full aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
);

const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonLine key={i} width={i === lines - 1 ? "w-3/4" : "w-full"} />
    ))}
  </div>
);

const BlogDetailSkeleton = () => (
  <div className="bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 w-32">
          <SkeletonLine height="h-6" />
        </div>

        <div className="mb-8 space-y-4">
          <SkeletonLine width="w-full" height="h-10" />
          <SkeletonLine width="w-4/5" height="h-10" />
          <SkeletonLine width="w-3/4" height="h-10" />
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <SkeletonLine width="w-24" height="h-5" />
          <SkeletonLine width="w-24" height="h-5" />
          <SkeletonLine width="w-24" height="h-5" />
        </div>

        <SkeletonImage />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-2xl mx-auto mt-12 space-y-6">
        <SkeletonText lines={5} />
        <SkeletonText lines={3} />
        <SkeletonText lines={4} />
        <SkeletonText lines={2} />
      </div>
    </div>
  </div>
);

const BlogDetailPost = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [translatedData, setTranslatedData] = useState(null);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const [t, setT] = useState({});
  const [canonicalUrl, setCanonicalUrl] = useState(null);
  const [textPlain, setTextPlain] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "blog");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getBlogPostBySlug(slug);

        const plainText =
          data.post?.content
            ?.map(
              (block) =>
                block.children?.map((child) => child.text).join("") || ""
            )
            .join("\n\n") || "";

        // Usa os dados tal como vêm do Sanity
        setPosts(data.post);
        setTextPlain(plainText);
        setRelatedPosts(data.relatedPosts || []);
        
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);


  const post = {
    excerpt: lang === "en" ? translatedData?.excerpt : posts?.excerpt,
    slug: lang === "en" ? translatedData?.slug : posts?.slug?.current,
    title: lang === "en" ? translatedData?.title : posts?.title,
    authorBio: lang === "en" ? translatedData?.authorBio : posts?.authorBio,
    image: posts?.image,
    authorName: lang === "en" ? translatedData?.authorName : posts?.authorName,
    categories: lang === "en" ? translatedData?.categories : posts?.categories,
    content: lang === "en" ? translatedData?.content : textPlain,
    _id: posts?._id,
    imageAlt: posts?.imageAlt,
    publishedAt: posts?.publishedAt,
    authorImage: posts?.authorImage,
  };

  const handleShare = (platform) => {
    if (!post) return;
    const url = `${window.location.origin}/${lang}/${post?.slug}`;
    const text = `${post.title} by ${post.authorName || "Our Team"}`;
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

 

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically make an API call to update the bookmark status
  };
  useEffect(() => {
    if (post?.slug) {
      setCanonicalUrl(`${window.location.origin}/${post.slug}`);
    }
  }, [post?.slug]);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!posts) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto px-6 py-12 bg-white rounded-xl shadow-sm">
          <div className="w-20 h-20 mx-auto mb-6 bg-amber-50 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-amberVar"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amberhover to-amberhover hover:from-amberhover hover:to-amberhover text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {}
          </Link>
        </div>
      </div>
    );
  }

  const seoTitle = `${post.title} | ${
    post.categories?.[0] || "Blog"
  } | Your Site`;
  const seoDescription =
    post.excerpt || post.title || "Read our latest blog post";
  {
    canonicalUrl && <link rel="canonical" href={canonicalUrl} />;
  }

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content={
            post.tags?.join(", ") || post.categories?.join(", ") || post.title
          }
        />
        <meta name="author" content={post.authorName || "Content Team"} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:site_name" content="Your Blog" />
        <meta property="article:published_time" content={post.publishedAt} />
        {post.authorName && (
          <meta property="article:author" content={post.authorName} />
        )}
        {post.categories?.[0] && (
          <meta property="article:section" content={post.categories[0]} />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {post.image && <meta name="twitter:image" content={post.image} />}
      </Head>

      <main className="bg-white min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-2 text-sm text-amberVar">
              <Link
                href="/#"
                className="hover:text-amberhover transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/${lang}/blog`}
                className="hover:text-amberhover transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-amberVar font-medium truncate max-w-xs md:max-w-md">
                {post.title}
              </span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Category and Back Button */}
            <div className="flex justify-between items-center mb-8">
              {post.categories?.[0] && (
                <Link
                  href={`/${lang}/blog/category/${post.categories[0].toLowerCase()}`}
                  className="inline-block px-4 py-2 text-xs font-semibold tracking-wide text-amberVar uppercase bg-amber-100 rounded-full hover:bg-amber-200 transition-colors"
                >
                  {post.categories[0]}
                </Link>
              )}
              <Link
                href={`/${lang}/blog`}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-amberhover transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t?.back}
              </Link>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
              suppressHydrationWarning
            >
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-8">
              {post.authorName && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm sm:text-base">
                    {post.authorName}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                {post?.publishedAt ? (
                <time suppressHydrationWarning>
                  {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                </time>
                ) : (
                  <span>Data indisponível</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm sm:text-base">
                  {post.readingTime || "5"} min read
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="rounded-xl overflow-hidden shadow-lg mb-8 lg:mb-12 border border-gray-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-contain"
                  priority
                />
                {post.imageCaption && (
                  <p className="text-xs text-gray-500 mt-2 px-2 italic">
                    {post.imageCaption}
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Content Title / Plain Text */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed mb-6">
                {post.content}
              </p>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-amberhover rounded-r-lg p-5 sm:p-6 lg:p-8 mb-10 shadow-sm">
                  <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/${lang}/blog/tag/${tag.toLowerCase()}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  

                  {/* Share Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">
                      Share this article:
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="p-2 rounded-lg bg-blue-50 text-blackDark hover:bg-blue-100 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="p-2 rounded-lg bg-blue-50 text-blackDark hover:bg-blue-100 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="p-2 rounded-lg bg-blue-50 text-b hover:bg-blue-100 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-lg transition-colors ${
                          isBookmarked
                            ? "bg-amber-50 text-amberVar hover:bg-amber-100"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-label="Bookmark article"
                      >
                        <Bookmark
                          className={`w-5 h-5 ${
                            isBookmarked ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-6 space-y-8">
                {/* Author Card */}
                {(post.authorName || post.authorImage) && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-start gap-4">
                      {post.authorImage ? (
                        <Image
                          src={post.authorImage}
                          alt={post.authorName || "Author"}
                          width={80}
                          height={80}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-100"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amberVar">
                          <User className="w-8 h-8 text-amberVar" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {post.authorName || "Content Writer"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {post.authorTitle || "Contributing Writer"}
                        </p>
                        <p className="text-sm text-gray-700">
                          {post.authorBio}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </article>

        {/* Featured Posts Section */}
        {relatedPosts.length > 3 && (
          <section className="bg-gray-50 border-t border-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  More Articles You'll Enjoy
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                  Discover more insightful content from our blog
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.slice(3, 6).map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
                  >
                    <Link href={`/${lang}/${post.slug.current}`}>
                      <div className="relative aspect-video">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {post.categories?.[0] && (
                            <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amberVar rounded-full">
                              {post.categories[0]}
                            </span>
                          )}
                          <time className="text-xs text-gray-500">
                            {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                          </time>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-amberVar font-medium">
                          Read article
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amberVar to-amberVar hover:from-amberhover hover:to-amberhover text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default BlogDetailPost;
