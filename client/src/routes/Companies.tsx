import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import ListBox from "../components/ListBox";
import Header from "../components/Header";
import CompanyCard from "../components/CompanyCard";
import Loading from "../components/Loaders/Loading";
import { GetCompanies, updateURL } from "../apis/fetching.apis";
import { AxiosError } from "axios";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchCompanies = async (signal: AbortSignal) => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location,
    }) || "";

    try {
      const res = await GetCompanies(newURL,signal);

      setNumPage(res?.numOfPage);
      setRecordsCount(res?.total);
      setData(res?.companydata);

      setIsFetching(false);
    } catch (error) {
       if ((error as AxiosError).code === 'ERR_CANCELED') {
          return;
      }
      console.error((error as AxiosError).message);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchCompanies(signal);

    return () => {
      controller.abort();
    };
  }, [page, sort, searchQuery, cmpLocation]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1); 
    await fetchCompanies(new AbortController().signal);
  };

  const handleShowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <Header
        title="Find Your Dream Company"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 py-6 bg-[#f7fdfd]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm md:text-base">
            Showing: <span className="font-semibold">{recordsCount}</span> Companies
            Available
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base hidden md:block">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {data?.length > 0 ? (
            data.map((cmp, index) => <CompanyCard cmp={cmp} key={index} />)
          ) : (
            <p className="text-gray-500 text-center">No companies found.</p>
          )}

          {isFetching && (
            <div className="mt-10">
              <Loading />
            </div>
          )}

          <p className="text-sm text-right">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-16">
            <CustomButton
              onClick={handleShowMore}
              title="Load More"
              containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
