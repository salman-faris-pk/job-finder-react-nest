import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "../redux/store";
import { fetchMyApplications, WithDrawApplication } from "../apis/fetching.apis";
import Loading from "../components/Loaders/Loading";
import { MyJobApplication } from "../utils/types";

enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

const Applications = () => {
  const { user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState<MyJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const res = await fetchMyApplications();
        setApplications(res?.applications);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user?.id]);

  const handleWithdraw = async(id: string) => {
    const res=await WithDrawApplication(id)
    if(res.success){
    toast.success(res?.message);
    setApplications((prev) => prev.filter((app) => app.id !== id));
    }else{
      toast.error(res?.message)
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyles = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED:
        return "bg-green-100 text-green-800 border-green-200";
      case ApplicationStatus.REJECTED:
        return "bg-red-100 text-red-800 border-red-200";
      case ApplicationStatus.PENDING:
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = Array.isArray(applications)
    ? applications.slice(indexOfFirstApplication, indexOfLastApplication)
    : [];
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Application Overview
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Manage and track your current job applications
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {applications.length === 0 ? (
            <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-10 text-center sm:text-left border border-gray-200/70 shadow-sm">
              <div className="flex justify-center sm:justify-start">
                <div className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300 mb-4 sm:mb-6">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                No Active Applications
              </h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
                Your submitted job applications will appear here once you apply
              </p>
              <div className="mt-4 sm:mt-6">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                  Explore Career Opportunities
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-200px)] sm:max-h-[700px] overflow-y-auto pr-1 sm:pr-3">
                {currentApplications.map((application) => (
                  <div
                    key={application.id}
                    className={`bg-white rounded-lg sm:rounded-xl border border-gray-200/70 overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200 mb-4 sm:mb-5 ${
                      expandedId === application.id
                        ? "ring-1 ring-gray-300/50"
                        : ""
                    }`}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start space-x-3 sm:space-x-5">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg object-cover border border-gray-200/70 shadow-xs"
                              src={application?.job?.company?.logo}
                              alt={application?.job?.company.name}
                              onError={(e) => {
                                (
                                  e.target as HTMLImageElement
                                ).src = `https://ui-avatars.com/api/?name=${application?.job?.company.name.charAt(
                                  0
                                )}&background=random&color=fff&bold=true&font-size=0.5`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                              {application?.job?.jobTitle}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 mt-1 truncate">
                              {application?.job?.company?.name}
                            </p>
                            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                                  application.applicationStatus as ApplicationStatus
                                )}`}
                              >
                                {application.applicationStatus}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                {application?.job?.jobType}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {application?.job?.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Applied on{" "}
                            <span className="text-gray-700 font-normal normal-case">
                              {new Date(
                                application?.appliedAt
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                                year: "numeric", 
                              })}
                            </span>
                          </p>
                          <p className="mt-1 text-sm font-semibold text-indigo-600">
                            Upto {application?.job.salary}
                          </p>
                        </div>
                      </div>

                      {expandedId === application.id && (
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100/70">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                            Position Details
                          </h4>
                          <p className="text-sm sm:text-base text-gray-700">
                            {application?.job?.detail[0].desc}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100/70 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50/30">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                        <button
                          onClick={() => toggleExpand(application.id)}
                          className="w-full sm:w-auto inline-flex justify-center items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100/50 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-150"
                        >
                          {expandedId === application.id ? (
                            <>
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                              Show Less
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                              View Details
                            </>
                          )}
                        </button>
                        {application.applicationStatus === ApplicationStatus.PENDING && (
                          <button
                            onClick={() => handleWithdraw(application.id)}
                            className="w-full sm:w-auto inline-flex justify-center items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-lg shadow-xs text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all duration-150"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {applications.length > applicationsPerPage && (
                <div className="flex justify-center mt-4 sm:mt-6">
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                          : "text-gray-700 bg-white hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm font-medium ${
                            currentPage === number
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium ${
                        currentPage === totalPages
                          ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                          : "text-gray-700 bg-white hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;