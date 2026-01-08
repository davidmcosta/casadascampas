'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllBlogPosts } from '../../../components/lib/blogData.js';
import Image from 'next/image.js';
import { usePathname } from 'next/navigation.js';
import { getDictionary } from '../dictionaries';
import translateText from '../../../components/helper/translateText.js';

const BlogSkeleton = () => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-12 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-lg p-4 space-y-4">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-3 w-full bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || 'en';
  const [t, setT] = useState({});

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
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const allPosts = await getAllBlogPosts();

      if (!allPosts || !Array.isArray(allPosts)) {
        throw new Error("Invalid posts data");
      }

      // Define os posts diretamente, sem tradução
      setPosts(allPosts);

      // Extrai categorias únicas
      const allCategories = allPosts.flatMap(post => post.categories || []);
      setUniqueCategories(['All', ...new Set(allCategories)]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
      setUniqueCategories(['All']);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []); // Sem dependência de lang, pois não traduzimos mais


  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => 
        post.categories?.some(cat => cat === selectedCategory)
    );

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 4);
  };

  if (loading) {
    return <BlogSkeleton/>;
  }

  return (
    <main className="bg-white min-h-screen">
     <header className="bg-blackDark text-white py-20 px-4 mt-8">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-amberVar">
      {t?.heroTitle}
    </h1>
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
      {t?.heroExcerpt}
    </p>
    <div className="w-20 sm:w-24 h-1 mx-auto bg-amberVar"></div>
  </div>
</header>

{/* Category Filter */}
<section className="bg-gray-50 py-8 top-0 z-10 shadow-sm">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {uniqueCategories.map((category) => (
        <button
          key={category}
          onClick={() => {
            setSelectedCategory(category);
            setVisiblePosts(4);
          }}
          className={`px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-amberVar text-blackDark shadow-lg transform scale-105'
              : 'bg-white text-blackVar hover:text-blackDark hover:shadow-md'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
</section>


      {/* Blog Posts */}
<section className="max-w-6xl mx-auto px-4 py-16">
  <div className="grid gap-16">
    {filteredPosts.slice(0, visiblePosts).map((post) => (
      <article
        key={post._id}
        className="group transition-all duration-500 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square w-full">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0  opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
        {post.categories?.[0] && (
  <div className="absolute top-4 left-4 max-w-[90%]">
    <span className="bg-amberVar px-4 py-1 text-xs sm:text-sm md:text-base font-semibold text-white rounded-full shadow-md break-words block">
      {post.categories[0]}
    </span>
  </div>
)}


        </div>

        {/* Text Section */}
        <div>
          <div className="flex flex-wrap items-center gap-6 mt-2 mb-4 text-xs sm:text-sm md:text-base text-amberVar">
            <div className="flex items-center gap-2 ">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{t?.byText} {post.authorName || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.ceil(post.excerpt?.length / 200) || 3} {t?.readTimeText}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-amberVar transition-colors duration-300">
            <Link
              href={`/${lang}/${post.slug?.current}`}
              className="hover:underline text-inherit"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <Link
            href={`/${lang}/${post.slug?.current}`}
            className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base md:text-lg text-black hover:text-amberVar transition-all duration-300 group/link"
          >
            {t?.readFull}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    ))}
  </div>

  {visiblePosts < filteredPosts.length && (
    <div className="text-center mt-20">
      <button
        onClick={handleLoadMore}
        className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg text-black font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform bg-amberVar"
      >
        {t?.loadMore}
      </button>
    </div>
  )}
</section>



      {/* Newsletter Section */}
      <section className="bg-blackVar text-white py-20">
  <div className="max-w-4xl mx-auto px-4 text-center">
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
      <span className="text-amberVar">{t?.stayInformedTitle}</span>
    </h2>

    {/* Paragraph */}
    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
      {t?.newsletterDescription}
    </p>

    {/* Form */}
    <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder={t?.placeholderEmail}
        className="flex-1 px-6 py-3 sm:py-4 rounded-full text-blackDark font-medium focus:outline-none focus:ring-4 focus:ring-amberhover text-sm sm:text-base md:text-lg"
        required
      />
      <button
        type="submit"
        className="px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-full transition-all duration-300 hover:scale-105 bg-amberVar text-blackDark text-sm sm:text-base md:text-lg"
      >
        {t?.subscribeButton}
      </button>
    </form>
  </div>
</section>

    </main>
  );
}

function generateSlugFromTitle(title) {
  return title
    ? title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    : `post-${Date.now()}`;
}