import { useState, useRef, useEffect } from 'react';

const CompanyApplicants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const containerRef = useRef(null);
  const [totalPages, setTotalPages] = useState(1);
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Sarah Johnson", location: "San Francisco, CA", status: "pending", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Michael Chen", location: "New York, NY", status: "pending", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Emily Rodriguez", location: "Chicago, IL", status: "pending", image: "https://randomuser.me/api/portraits/women/63.jpg" },
    { id: 4, name: "David Kim", location: "Seattle, WA", status: "pending", image: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: 5, name: "Jessica Williams", location: "Austin, TX", status: "pending", image: "https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 6, name: "Robert Garcia", location: "Miami, FL", status: "pending", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 7, name: "Amanda Lee", location: "Boston, MA", status: "pending", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 8, name: "James Wilson", location: "Denver, CO", status: "pending", image: "https://randomuser.me/api/portraits/men/55.jpg" },
    { id: 9, name: "Olivia Brown", location: "Portland, OR", status: "pending", image: "https://randomuser.me/api/portraits/women/33.jpg" },
  ]);

  useEffect(() => {
    setTotalPages(Math.ceil(applicants.length / itemsPerPage));
    if (currentPage > Math.ceil(applicants.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(applicants.length / itemsPerPage) || 1);
    }
  }, [applicants, itemsPerPage, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplicants = applicants.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id:number) => {
    setApplicants(applicants.filter(applicant => applicant.id !== id));
  };

  return (
    <div className="w-full h-full p-4 bg-white flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Applicants</h2>
      
      {applicants.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg">No applications yet</p>
          <p className="text-sm mt-1 text-center max-w-xs">Applicants will appear here when they apply to your job postings.</p>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3">
            {currentApplicants.map(applicant => (
              <div key={applicant.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img 
                      src={applicant.image} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      alt="Applicant"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{applicant.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {applicant.location}
                      </p>
                    </div>
                  </div>
            
                  <div className="flex items-center gap-2">
                    <select
                      defaultValue={applicant.status}
                      className="text-xs py-1.5 px-2 rounded border bg-yellow-50 border-yellow-200 text-yellow-800 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
            
                    <button 
                      onClick={() => handleDelete(applicant.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100 transition-colors"
                      title="Remove applicant"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show pagination only if more than 7 applicants */}
          {applicants.length > 7 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CompanyApplicants;