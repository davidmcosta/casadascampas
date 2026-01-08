"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProductFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  lang 
}) {
  const pathname = usePathname()
  
  return (
    <div className="mb-8">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-amberVar dark:text-white">
          {lang === 'pt' ? 'Filtrar por Categoria' : 'Filter by Category'}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {categories.length} {lang === 'pt' ? 'categorias' : 'categories'}
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Link
          href={`/${lang}/products`}
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !activeCategory
              ? 'bg-amberVar text-white shadow-md transform scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
          }`}
        >
          {lang === 'pt' ? 'Todos os Produtos' : 'All Products'}
        </Link>
        
        {categories?.map((category) => (
          <Link
            key={category}
            href={`/${lang}/products/${encodeURIComponent(category.toLowerCase())}`}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory?.toLowerCase() === category.toLowerCase()
                ? 'bg-amberVar text-white shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}
