import { FiMapPin, FiBriefcase, FiClock, FiChevronRight } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { RecentJobsPosts } from "../utils/types";

type JobCardProps = {
  job: RecentJobsPosts;
};

const JobCard = ({ job }: JobCardProps) => {
  const location = useLocation();

  return (
    <Link
      to={`/job-detail/${job?.id}`}
      className="group block transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col">
        <div className="px-5 pt-5">
          <div className="flex items-start gap-4">
            {location.pathname !== '/upload-job' && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={job?.logo}
                    alt={job?.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                {job?.jobTitle}
              </h3>
              <div className="flex items-center text-gray-500 mt-1 text-sm">
                <HiOutlineOfficeBuilding className="mr-1.5 flex-shrink-0" />
                <span className="truncate">{job?.name || "Confidential"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 my-4">
          <div className="border-t border-gray-100"></div>
        </div>

        <div className="px-5 mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-sm text-gray-600">
              <FiBriefcase className="mr-1.5 text-gray-400" />
              {job?.jobType}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiMapPin className="mr-1.5 text-gray-400" />
              {job?.location.length > 18 
                ? `${job?.location.slice(0, 18)}...` 
                : job?.location}
            </div>
          </div>
        </div>

        <div className="px-5 flex-1">
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {job?.detail[0]?.desc?.slice(0, 120) + 
             (job?.detail[0]?.desc?.length > 120 ? "..." : "")}
          </p>
        </div>

        <div className="px-5 py-4 mt-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <FiClock className="mr-1.5" />
              {moment(job?.createdAt).fromNow()}
            </div>
            <div className="text-sm font-medium text-blue-600 flex items-center">
              View details
              <FiChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;