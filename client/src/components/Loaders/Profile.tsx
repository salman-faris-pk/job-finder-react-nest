


const ProfileLoader = () => {
  return (
    <div className="container mx-auto py-10 px-4 relative">
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <div className="bg-gray-200 p-4 rounded-full shadow-lg w-14 h-14 animate-pulse"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-100 p-8">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="md:mr-8 mb-6 md:mb-0">
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-100 animate-pulse"></div>
            </div>
            <div className="flex-1 md:text-left">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-gray-200 mr-3 animate-pulse"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3 pl-4">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-gray-200 mr-3 animate-pulse"></div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-gray-200 mr-3 animate-pulse"></div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3 pl-4">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-end mt-10">
            <div className="h-12 w-48 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;