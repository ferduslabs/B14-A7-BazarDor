export default function SkeletonCard() {
  return (
    <div className="bg-bazar-card rounded-2xl border border-gray-200/60 p-4 h-full">
      <div className="animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200/70 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200/70 rounded w-3/4 mb-1.5"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-200/50">
          <div>
            <div className="h-2.5 bg-gray-100 rounded w-12 mb-1"></div>
            <div className="h-6 bg-gray-200/70 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-100 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
