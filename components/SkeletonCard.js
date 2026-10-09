export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 h-full">
      <div className="animate-pulse">
        <div className="w-14 h-14 bg-gray-200 rounded-lg mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
        <div className="flex items-end justify-between">
          <div>
            <div className="h-3 bg-gray-100 rounded w-16 mb-1"></div>
            <div className="h-7 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-6 bg-gray-100 rounded w-14"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
