import { useState, useEffect, useDeferredValue } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { jobTypes, experience } from "../utils/datas";
import { BsStars } from "react-icons/bs";
import ListBox from "../components/ListBox";
import JobCard from "../components/JobCard";
import { FindsJobs, updateURL } from "../apis/fetching.apis";
import { Job } from "../utils/types";
import { AxiosError } from "axios";
import { JobCardsSkeleton } from "../components/Loaders/JobCard";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState<string[]>([]);
  const [filterExp, setFilterExp] = useState<string[]>([]);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredJobLocation = useDeferredValue(jobLocation);
  const deferredFilterJobTypes = useDeferredValue(filterJobTypes);
  const deferredFilterExp = useDeferredValue(filterExp);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchJobs = async (controller: AbortController) => {
    const { signal } = controller;

    const newURL =
      updateURL({
        pageNum: page,
        query: deferredSearchQuery,
        cmpLoc: deferredJobLocation,
        sort: sort,
        navigate: navigate,
        location: location,
        jType: deferredFilterJobTypes,
        exp: deferredFilterExp,
      }) || "";

    try {
      const res = await FindsJobs(newURL, signal);

      if (!signal.aborted) {
          setNumPage(res?.numOfPage);
          setRecordCount(res?.totalJobs);
          setData(res?.data);
          setIsLoading(false);
      }
    } catch (error) {
      if ((error as AxiosError).code === "ERR_CANCELED") {
        return;
      }
      console.error((error as AxiosError).message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchJobs(controller);

    return () => {
      controller.abort();
    };
  }, [page, sort, deferredSearchQuery, deferredJobLocation, deferredFilterJobTypes, deferredFilterExp]);

  const filterJobs = (val: string) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
    setPage(1);
    setIsLoading(true);
  };

  const filterExperience = (value: string) => {
    setFilterExp((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setPage(1);
    setIsLoading(true);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setIsLoading(true);
  };

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
    setIsLoading(true);
  };

  return (
    <div>
      <Header
        title="Find Your Dream Job with Ease"
        type="home"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]">
        <div className="hidden lg:flex flex-col w-1/6 h-fit bg-white shadow-sm p-3">
          <p className="text-lg font-semibold text-slate-600">Filter Search</p>

          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jtype, index) => (
                <div key={index} className="flex gap-2 text-sm md:text-base ">
                  <input
                    type="checkbox"
                    value={jtype}
                    className="w-4 h-4"
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {experience.map((exp) => (
                <div key={exp.title} className="flex gap-3">
                  <input
                    type="checkbox"
                    value={exp?.value}
                    className="w-4 h-4"
                    checked={filterExp.includes(exp.value)}
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base">
              Showing: <span className="font-semibold">{recordCount}</span> Jobs
              Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
              <p className="hidden md:block text-sm md:text-base">Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          {isLoading ? (
            <div className="py-10 w-full">
              <JobCardsSkeleton />
            </div>
          ) : data.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg font-medium">
                No jobs available
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Check back later for new opportunities
              </p>
            </div>
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
              {data.map((job) => (
                <JobCard
                  key={job.id}
                  job={{
                    ...job,
                    name: job.company?.name,
                    logo: job.company?.profileUrl,
                  }}
                />
              ))}
            </div>
          )}

          {numPage > 1 && !isLoading && (
            <div className="w-full flex items-center justify-center pt-16 gap-4">
              {page > 1 && (
                <CustomButton
                  title="Previous"
                  containerStyles={`text-blue-600 cursor-pointer py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                  onClick={() => {
                    setPage((prev) => prev - 1);
                    setIsLoading(true);
                  }}
                />
              )}

              {numPage > page && (
                <CustomButton
                  title="Load More"
                  containerStyles={`text-blue-600 cursor-pointer py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                  onClick={handleLoadMore}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;