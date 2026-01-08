// components/Skeleton.js
"use client";

export const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`}></div>
);

 const HeroSkeleton = () => {
  return (
    <section className="relative h-[60vh] bg-blackDark flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 z-10 relative py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
        <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          {/* Divider Skeleton */}
          <Skeleton className="w-12 sm:w-14 md:w-16 lg:w-20 h-0.5 sm:h-0.5 md:h-1 mb-2 sm:mb-2 md:mb-2 lg:mb-2" />

          {/* Title Skeleton */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-3/4" />
            <Skeleton className="h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-1/2" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 mb-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
                <Skeleton className="h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-full mb-1" />
                <Skeleton className="h-3 w-3/4 mx-auto" />
              </div>
            ))}
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <Skeleton className="h-10 sm:h-11 md:h-12 lg:h-13 w-full sm:w-40" />
            <Skeleton className="h-10 sm:h-11 md:h-12 lg:h-13 w-full sm:w-40" />
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSkeleton;   