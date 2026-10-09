export default function SkeletonCard() {
  return (
    <div className="bg-bazar-card rounded-2xl border border-gray-200 p-4 h-full">
      <div className="animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200/70 rounded-2xl"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200/70 rounded w-3/4 mb-2"></div>
            <div className="h-3.5 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-200/50">
          <div>
            <div className="h-3 bg-gray-100 rounded w-14 mb-1.5"></div>
            <div className="h-6 bg-gray-200/70 rounded w-20"></div>
          </div>
          <div className="h-7 bg-gray-100 rounded-full w-14"></div>
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
