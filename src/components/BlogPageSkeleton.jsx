
const BlogPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="w-full lg:w-80 h-10 bg-gray-200 rounded"></div>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 w-full mb-2"></div>
              <div className="h-3 bg-gray-200 w-1/2"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles List */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Articles */}
          <div className="lg:col-span-8 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 border rounded-xl p-5">
                <div className="h-4 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-5 bg-gray-300 w-2/3 mb-2 rounded"></div>
                <div className="h-3 bg-gray-300 w-full mb-2 rounded"></div>
                <div className="h-3 bg-gray-300 w-5/6 rounded"></div>
              </div>
            ))}
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-4 h-32"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-amber-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="h-6 bg-gray-200 w-1/2 mx-auto mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 w-2/3 mx-auto mb-6 rounded"></div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="h-10 bg-white border border-gray-300 rounded w-2/3"></div>
            <div className="h-10 bg-amberVar rounded w-32"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amberVar py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="h-6 bg-white w-2/3 mx-auto mb-4 rounded"></div>
          <div className="h-4 bg-amber-100 w-1/2 mx-auto mb-6 rounded"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-10 bg-white rounded w-40"></div>
            <div className="h-10 border border-white rounded w-40"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPageSkeleton;
