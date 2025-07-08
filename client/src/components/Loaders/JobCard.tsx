import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";

const JobCardSkeleton = () => {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs flex flex-col animate-pulse">
      <div className="px-5 pt-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="px-5 my-4">
        <div className="border-t border-gray-100"></div>
      </div>

      <div className="px-5 mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <FiBriefcase className="mr-1.5 text-gray-300" />
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-1.5 text-gray-300" />
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="px-5 flex-1">
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="px-5 py-4 mt-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FiClock className="mr-1.5 text-gray-300" />
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const JobCardsSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
};