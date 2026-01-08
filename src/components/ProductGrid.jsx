"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getProducts } from "./lib/api";
import translateText from "./helper/translateText.js";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import ImageModal from "./ImageModal";

export default function ProductGrid({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added search state
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = pathname.split("/")[1] || "en";

  // Get category from URL params
  const categoryFromUrl = params?.category?.[0] ? decodeURIComponent(params.category[0]) : null;
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  // Extract unique categories with useMemo
  const categories = useMemo(() => 
    [...new Set(products?.map((product) => product.category).filter(Boolean))],
    [products]
  );

  // Filter products based on active category and search term
  const filteredProducts = useMemo(() => 
    products?.filter((product) => {
      const matchesCategory = activeCategory
        ? product.category?.toLowerCase() === activeCategory.toLowerCase()
        : true;
      const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [],
    [activeCategory, products, searchTerm]
  );

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = useMemo(() => 
    Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage]
  );
  const paginatedProducts = useMemo(() => 
    filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    [filteredProducts, currentPage, itemsPerPage]
  );

  // Modal control
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Handle category change with URL update
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset pagination on category change
    setSearchTerm(""); // Reset search on category change
    
    if (category) {
      const encodedCategory = encodeURIComponent(category.toLowerCase());
      router.push(`/${lang}/products/${encodedCategory}`, { scroll: false });
    } else {
      router.push(`/${lang}/products`, { scroll: false });
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination on search
  };

  // Update active category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      const matchingCategory = categories.find(cat => 
        cat.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      setActiveCategory(matchingCategory || categoryFromUrl);
    } else {
      setActiveCategory(null);
    }
    setCurrentPage(1);
  }, [categoryFromUrl, categories]);

  // Fetch products
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid products data");
      }

      // Sem traduções
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [lang]);


  // Handle modal opening based on URL query param
  useEffect(() => {
    const productIdFromUrl = searchParams.get('product');
    if (productIdFromUrl && products.length > 0) {
      const product = products.find(p => p?.slug === productIdFromUrl);
      if (product) {
        setSelectedProduct(product);
        setIsImageModalOpen(true);
      }
    }
  }, [searchParams, products]);


  // Function to open modal and update URL
  const openModal = (product) => {
  if (!product?.slug) {
    console.error("Slug missing for product:", product);
    return;
  }
  setSelectedProduct(product);
  setIsImageModalOpen(true);

  const newUrl = new URL(window.location);
  newUrl.searchParams.set('product', product.slug);
  window.history.pushState({ productId: product.slug }, '', newUrl);

};


  // Function to close modal and clean URL
  const closeModal = () => {
    setIsImageModalOpen(false);
    setSelectedProduct(null);
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete('product');
    window.history.pushState({}, '', newUrl);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amberVar mb-2">
            {lang === "pt" ? "Carregando..." : "Loading..."}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            {lang === "pt" ? "Erro ao carregar produtos" : "Error loading products"}
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href={`/${lang}`} className="text-gray-700 hover:text-amberVar dark:text-gray-400 dark:hover:text-white">
              {lang === "pt" ? "Início" : "Home"}
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <a href={`/${lang}/products`} className="text-gray-700 hover:text-amberVar dark:text-gray-400 dark:hover:text-white">
                {lang === "pt" ? "Produtos" : "Products"}
              </a>
            </div>
          </li>
          {activeCategory && (
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-amberVar font-medium">
                  {activeCategory}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-amberVar">
          {activeCategory 
            ? (lang === "pt" ? `${activeCategory}` : `${activeCategory}`)
            : (lang === "pt" ? "Todos os Produtos" : "All Products")
          }
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
          {activeCategory
            ? (lang === "pt" ? `Explore nossa coleção de ${activeCategory}` : `Explore our ${activeCategory} collection`)
            : (lang === "pt" ? "Descubra nossa coleção premium" : "Discover our premium collection")
          }
        </p>
        {filteredProducts.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {lang === "pt" 
              ? `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
              : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
            }
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={lang === "pt" ? "Pesquisar produtos..." : "Search products..."}
          className="w-full max-w-md mx-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amberVar dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Product Filter Component */}
      <ProductFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        lang={lang}
      />

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              lang={lang}
              onImageClick={() => openModal(product)}
              productSlug={product?.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {lang === "pt" ? "Nenhum produto encontrado" : "No products found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm
                ? (lang === "pt" 
                    ? `Nenhum produto encontrado para "${searchTerm}".`
                    : `No products found for "${searchTerm}".`
                  )
                : activeCategory 
                  ? (lang === "pt" 
                      ? `Não encontramos produtos na categoria "${activeCategory}". Tente outra categoria.`
                      : `We couldn't find any products in "${activeCategory}". Try another category.`
                    )
                  : (lang === "pt" 
                      ? "Não há produtos disponíveis no momento."
                      : "No products are available at the moment."
                    )
              }
            </p>
            {(activeCategory || searchTerm) && (
              <button
                onClick={() => {
                  handleCategoryChange(null);
                  setSearchTerm("");
                }}
                className="bg-amberVar hover:bg-amberhover text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {lang === "pt" ? "Ver todos os produtos" : "View all products"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-amberVar text-white rounded "
          >
            {lang === "pt" ? "Anterior" : "Previous"}
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => {
              setCurrentPage(prev => {
                const newPage = prev + 1;
                return newPage <= totalPages ? newPage : prev;
              });
            }}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-amberVar text-white rounded "
          >
            {lang === "pt" ? "Próximo" : "Next"}
          </button>
        </div>
      )}

      {/* Shared Image Modal */}
      {selectedProduct && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={closeModal}
          imageSrc={selectedProduct.variants?.[0]?.imageUrl || selectedProduct.image}
          imageAlt={selectedProduct.title}
          title={selectedProduct.title}
          description={selectedProduct.description}
          variants={selectedProduct.variants}
          productId={selectedProduct.id}
          productSlug={selectedProduct?.slug ?? ""}
          lang={lang}
        >
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap px-2">
            {selectedProduct.variants?.map((variant, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    // Update image in modal - handle variant selection (to be implemented in ImageModal)
                  }}
                  className="p-1 rounded-full transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                    <Image
                      src={variant?.imageUrl || "/placeholder.svg?height=56&width=56"}
                      alt={`${selectedProduct.title} - ${variant.color}`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <span className="text-xs sm:text-sm mt-1 text-gray-700 dark:text-gray-300 capitalize">
                  {variant?.color}
                </span>
              </div>
            ))}
          </div>
        </ImageModal>
      )}
    </div>
  );
}