"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ChevronDown, Clock, Calendar, User, Search, Tag, ArrowRight, Eye, Share2 } from 'lucide-react';
import { Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import BlogPageSkeleton from "./BlogPageSkeleton";
import { getDictionary } from '@/app/[lang]/dictionaries';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const BlogPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || 'pt';
  const [t, setT] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lang, "blogPage");
        setT(dict || {});
      } catch (error) {
        console.error("Error loading dictionary:", error);
        setT({});
      }
    };
    loadDictionary();
  }, [lang]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Blog posts data with fallbacks
 const blogPosts = [
    {
      id: 1,
      title: t?.blog?.articles?.posts?.[0]?.title,
      slug: 'arte-escultura-funeraria-tradicao-modernidade',
      excerpt: t?.blog?.articles?.posts?.[0]?.excerpt,
      content: t?.blog?.articles?.posts?.[0]?.content, 
      date: '2024-05-20',
      readTime: '5 min',
      author: t?.blog?.articles?.details?.author,
      category: 'Art',
      tags: ['escultura', 'mármore', 'tradição', 'arte funerária'],
      image: 'images/articles/art.jpg',
      views: 1245,
      featured: true
    },
    {
      id: 2,
      title: t?.blog?.articles?.posts?.[1]?.title,
      slug: 'escolhendo-marmore-perfeito-guia-completo',
      excerpt: t?.blog?.articles?.posts?.[1]?.excerpt,
      content: t?.blog?.articles?.posts?.[1]?.content,
      date: '2024-05-15',
      readTime: '4 min',
      author: t?.blog?.articles?.details?.author,
      category: 'Materials',
      tags: ['mármore', 'materiais', 'qualidade', 'Carrara'],
      image: 'images/img8.jpg',
      views: 892,
      featured: false
    },
    {
      id: 3,
      title: t?.blog?.articles?.posts?.[2]?.title,
      slug: 'manutencao-monumentos-funerarios-cuidados',
      excerpt: t?.blog?.articles?.posts?.[2]?.excerpt,
      content: t?.blog?.articles?.posts?.[2]?.content,
      date: '2024-05-10',
      readTime: '3 min',
      author: t?.blog?.articles?.details?.author,
      category: 'Maintenance',
      tags: ['manutenção', 'conservação', 'limpeza', 'preservação'],
      image: 'images/img10.png',
      views: 634,
      featured: false
    },
    {
      id: 4,
      title: t?.blog?.articles?.posts?.[3]?.title,
      slug: 'personalizacao-lapides-memoria-unica',
      excerpt: t?.blog?.articles?.posts?.[3]?.excerpt,
      content: t?.blog?.articles?.posts?.[3]?.content,
      date: '2024-05-05',
      readTime: '4 min',
      author: t?.blog?.articles?.details?.author,
      category: 'Personalization',
      tags: ['personalização', 'lápides', 'memória', 'porcelana'],
      image: 'images/articles/memory.jpg',
      views: 1087,
      featured: true
    },
    {
      id: 5,
      title: t?.blog?.articles?.posts?.[4]?.title,
      slug: 'simbolismo-arte-funeraria-portuguesa',
      excerpt: t?.blog?.articles?.posts?.[4]?.excerpt,
      content: t?.blog?.articles?.posts?.[4]?.content,
      date: '2024-04-28',
      readTime: '5 min',
      author: t?.blog?.articles?.details?.author,
      category: 'History',
      tags: ['simbolismo', 'história', 'tradição', 'Portugal'],
      image: 'images/img12.jpg',
      views: 756,
      featured: false
    },
    {
      id: 6,
      title: t?.blog?.articles?.posts?.[5]?.title,
      slug: 'tendencias-modernas-design-funerario',
      excerpt: t?.blog?.articles?.posts?.[5]?.excerpt,
      content: t?.blog?.articles?.posts?.[5]?.content,
      date: '2024-04-22',
      readTime: '4 min',
      author: t?.blog?.articles?.details?.author,
      category: 'Design',
      tags: ['design moderno', 'tendências', 'inovação', 'minimalismo'],
      image: 'images/articles/modern.jpg',
      views: 923,
      featured: true
    }
  ];

  const categories = [ ...Object.keys(t?.blog?.search?.categories || {})].filter(Boolean);

  useEffect(() => {
    const filterPosts = () => {
      let filtered = [...blogPosts];

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(post =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
        );
      }

      setFilteredPosts(filtered);
      setIsLoading(false);
    };

    filterPosts();
  }, [searchTerm, selectedCategory, t]);

  useEffect(() => {
    const counts = {};
    blogPosts.forEach(post => {
      counts[post.id] = post.views;
    });
    setViewCounts(counts);
  }, []);

  const handleShare = async (post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${window.location.origin}/${lang}/blog/${post.slug}`
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/${lang}/blog/${post.slug}`);
        alert(t?.blog?.articles?.details?.share || 'Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(lang, options);
  };

  if (!t) return <BlogPageSkeleton />;

  return (
    <>
      <Head>
        <title>{t?.blog?.metadata?.title || "Blog - Casa das Campus"}</title>
        <meta name="description" content={t?.blog?.metadata?.description || "Explore our articles on funerary art, materials, and memorials"} />
        <meta name="keywords" content={t?.blog?.metadata?.keywords || "funerary art, memorials, marble, granite, cemetery"} />
        <meta property="og:title" content={t?.blog?.metadata?.title || "Blog - Casa das Campus"} />
        <meta property="og:description" content={t?.blog?.metadata?.description || "Explore our articles on funerary art, materials, and memorials"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://casadascampus.com/${lang}/blog`} />
        <link rel="canonical" href={`https://casadascampus.com/${lang}/blog`} />
      </Head>

      <main className={`min-h-screen bg-gray-50 ${roboto.className}`}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12 md:py-20">
          <div className="absolute inset-0 bg-[url('/images/profile7.jpg')] opacity-5 bg-cover bg-center" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className={`text-3xl md:text-4xl lg:text-5xl text-blackVar mb-4 font-bold`}>
                {t?.blog?.hero?.title || "Our Blog"}
                <span className="block text-amberVar text-xl md:text-2xl mt-2">
                  {t?.blog?.hero?.subtitle || "Insights and Inspiration"}
                </span>
              </h1>
              <p className="text-blackVar mb-8 text-base md:text-lg">
                {t?.blog?.hero?.description || "Discover articles about funerary art, materials, and memorial traditions"}
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className={`bg-white py-6 border-b border-gray-200 shadow-sm`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="w-full lg:w-96">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t?.blog?.search?.placeholder || "Search articles..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amberVar focus:border-amberVar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs md:text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-amberVar text-white shadow-md'
                        : 'bg-gray-100 text-blackVar hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' 
                      ? t?.blog?.search?.categories?.all || 'All' 
                      : t?.blog?.search?.categories?.[category] || category}
                  </button>
                ))}
              </div>
            </div>

           
          </div>
        </section>
         {/* Blog Posts List */}
        <section className="bg-white py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className={`text-2xl font-bold text-blackDark mb-2`}>
                {t?.blog?.articles?.title || "All Articles"}
              </h2>
              <p className={`text-blackVar text-sm md:text-base`}>
                {t?.blog?.articles?.description || "Browse our complete collection of articles"}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amberVar`}></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-blackVar`}>
                  {t?.blog?.articles?.empty || "No articles found matching your criteria"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={activeIndex === index}
                      aria-controls={`post-content-${post.id}`}
                    >
                      <header className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`bg-amber-100 text-amberVar px-2 py-1 rounded-full text-xs font-medium`}>
                              {t?.blog?.search?.categories?.[post.category] || post.category}
                            </span>
                            {post.featured && (
                              <span className={`bg-amberVar text-white px-2 py-1 rounded-full text-xs`}>
                                {t?.blog?.articles?.details?.featured || 'Featured'}
                              </span>
                            )}
                          </div>

                          <h2 className={`text-xl font-bold text-blackDark mb-3`} itemProp="headline">
                            {post.title}
                          </h2>

                          <p className={`text-blackVar mb-4 text-sm`} itemProp="description">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-blackVar mb-4">
                            <span className="flex items-center gap-1" itemProp="author">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={post.date} itemProp="datePublished">
                                {formatDate(post.date)}
                              </time>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{viewCounts[post.id] || 0}</span>
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className={`flex items-center gap-1 text-xs text-amberVar bg-amber-50 px-2 py-1 rounded-full`}
                                itemProp="keywords"
                              >
                                <Tag className="w-2 h-2" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(post);
                            }}
                            className={`flex items-center gap-1 text-blackVar hover:text-amberVar transition-colors text-xs`}
                            aria-label="Share this article"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="sr-only md:not-sr-only">
                              {t?.blog?.articles?.details?.share || 'Share'}
                            </span>
                          </button>

                          <ChevronDown 
                            className={`w-4 h-4 text-amberhover transition-transform duration-300 ${
                              activeIndex === index ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </header>
                    </div>
                    
                    <div
                      id={`post-content-${post.id}`}
                      className={`px-5 pb-5 text-blackVar transition-all duration-300 overflow-hidden ${
                        activeIndex === index 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                      itemProp="articleBody"
                    >
                      <div className={`bg-gray-50 rounded-lg p-4 border border-gray-100`}>
                        <p className="mb-4 text-sm">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                          <Link 
                            href={`/${lang}/blog${post.slug}`} 
                            className={`inline-flex items-center justify-center bg-amberVar hover:bg-amberhover text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium`}
                            aria-label={`Read full article: ${post.title} `}
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            {t?.blog?.articles?.details?.fullArticle || 'Read full article'}
                          </Link>
                          
                          <Link 
                            href={`/${lang}/contact`} 
                            className={`inline-flex items-center justify-center border border-amberVar text-amberVar hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium`}
                          >
                            {t?.blog?.articles?.details?.contact || 'Contact us'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Posts */}
        {selectedCategory === 'all' && !searchTerm && (
          <section className="bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-2xl font-bold text-blackDark mb-6 text-center`}>
                {t?.blog?.featured?.title || "Featured Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.filter(post => post.featured).slice(0, 3).map((post) => (
                  <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-amberVar text-white px-2 py-1 rounded-full text-xs">
                            {t?.blog?.articles?.details?.featured || 'Featured'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-blackVar mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className={`text-lg font-semibold text-blackDark mb-2 line-clamp-2`}>
                        {post.title}
                      </h3>
                      <p className="text-blackVar mb-4 line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>
                      
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

       

        {/* CTA Section */}
        <section className={`bg-gradient-to-r from-amberVar to-amberVar py-12 md:py-16`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`text-2xl md:text-3xl font-bold text-white mb-4`}>
              {t?.blog?.cta?.title || "Need personalized assistance?"}
            </h2>
            <p className={`text-amber-100 mb-6 max-w-2xl mx-auto text-sm md:text-base`}>
              {t?.blog?.cta?.description || "Our team is ready to help you create a meaningful memorial"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href={`/${lang}/contact`} 
                className={`inline-flex items-center justify-center bg-white text-amberVar hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors duration-300 text-sm md:text-base`}
                aria-label="Contact us"
              >
                {t?.blog?.cta?.contact || 'Contact us'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href={`/${lang}/products`} 
                className={`inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-amberVar px-6 py-3 rounded-lg font-bold transition-colors duration-300 text-sm md:text-base`}
                aria-label="View our products"
              >
                {t?.blog?.cta?.products || 'Our products'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;