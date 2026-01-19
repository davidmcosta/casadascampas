import { Suspense } from "react"
import ProductGrid from "../../../../components/ProductGrid"
import CartSidebar from "../../../../components/CartSidebar"

function ProductGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16" />
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ProductsPage({ params }) {
  // Await the params as they might be a Promise in Next.js 15
  const resolvedParams = await params;
  
  return (
    <main className="min-h-screen pt-20">
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid params={resolvedParams} />
      </Suspense>
    </main>
  )
}

// Generate static params for common categories (optional)
export async function generateStaticParams() {
  const commonCategories = [
    'bells',
    'instruments', 
    'accessories',
    'antique',
    'collections',
    'custom'
  ];

  return commonCategories.map((category) => ({
    category: [category],
  }));
}
