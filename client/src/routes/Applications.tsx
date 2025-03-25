import { useState } from 'react';
import { toast } from 'sonner';

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      companyName: 'TechSolutions Inc.',
      companyLogo: 'https://logo.clearbit.com/techsolutions.com',
      status: 'Under Review',
      appliedDate: '2023-10-15',
      location: 'Remote',
      salary: '$120K - $150K',
      type: 'Full-time',
      description: 'Develop and maintain high-quality web applications using React and TypeScript.'
    },
    {
      id: 2,
      jobTitle: 'UX/UI Designer',
      companyName: 'CreativeMinds LLC',
      companyLogo: 'https://logo.clearbit.com/creativeminds.com',
      status: 'Interview Scheduled',
      appliedDate: '2023-10-10',
      location: 'New York, NY',
      salary: '$90 - $120/hr',
      type: 'Contract',
      description: 'Create beautiful user interfaces and design systems for enterprise clients.'
    },
    {
      id: 3,
      jobTitle: 'Backend Engineer',
      companyName: 'DataSystems Corp',
      companyLogo: 'https://logo.clearbit.com/datasystems.com',
      status: 'Offer Received',
      appliedDate: '2023-10-05',
      location: 'Austin, TX',
      salary: '$110K - $140K',
      type: 'Full-time',
      description: 'Build scalable microservices architecture with Node.js and AWS.'
    },
    {
        id: 4,
        jobTitle: 'Backend Engineer',
        companyName: 'DataSystems Corp',
        companyLogo: 'https://logo.clearbit.com/datasystems.com',
        status: 'Offer Received',
        appliedDate: '2023-10-05',
        location: 'Austin, TX',
        salary: '$110K - $140K',
        type: 'Full-time',
        description: 'Build scalable microservices architecture with Node.js and AWS.'
      },
      {
        id: 5,
        jobTitle: 'Backend Engineer',
        companyName: 'DataSystems Corp',
        companyLogo: 'https://logo.clearbit.com/datasystems.com',
        status: 'Offer Received',
        appliedDate: '2023-10-05',
        location: 'Austin, TX',
        salary: '$110K - $140K',
        type: 'Full-time',
        description: 'Build scalable microservices architecture with Node.js and AWS.'
      },
      {
        id: 6,
        jobTitle: 'Backend Engineer',
        companyName: 'DataSystems Corp',
        companyLogo: 'https://logo.clearbit.com/datasystems.com',
        status: 'Offer Received',
        appliedDate: '2023-10-05',
        location: 'Austin, TX',
        salary: '$110K - $140K',
        type: 'Full-time',
        description: 'Build scalable microservices architecture with Node.js and AWS.'
      },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const statusVariant: any = {
    'Under Review': { 
      bg: 'bg-blue-100/30', 
      text: 'text-blue-900', 
      border: 'border-blue-200',
      icon: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    'Interview Scheduled': { 
      bg: 'bg-violet-100/30', 
      text: 'text-violet-900', 
      border: 'border-violet-200',
      icon: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    'Offer Received': { 
      bg: 'bg-emerald-100/30', 
      text: 'text-emerald-900', 
      border: 'border-emerald-200',
      icon: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    'Rejected': { 
      bg: 'bg-gray-100/30', 
      text: 'text-gray-700', 
      border: 'border-gray-300',
      icon: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleWithdraw = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
    toast.success('Application withdrawn successfully');
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Application Overview</h1>
          <p className="mt-2 text-gray-600">Manage and track your current job applications</p>
        </div>

        <div className={`space-y-5 ${applications.length > 6 ? 'max-h-[700px] overflow-y-auto pr-3' : ''}`}>
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-left border border-gray-200/70 shadow-sm">
              <div className="h-20 w-20 text-gray-300 mb-6">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">No Active Applications</h3>
              <p className="mt-2 text-gray-500">Your submitted job applications will appear here once you apply</p>
              <button className="mt-6 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                Explore Career Opportunities
              </button>
            </div>
          ) : (
            applications.map((application) => (
              <div 
                key={application.id} 
                className={`bg-white rounded-xl border border-gray-200/70 overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200 ${expandedId === application.id ? 'ring-1 ring-gray-300/50' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-14 w-14 rounded-lg object-cover border border-gray-200/70 shadow-xs"
                          src={application.companyLogo}
                          alt={application.companyName}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${application.companyName.charAt(0)}&background=random&color=fff&bold=true&font-size=0.5`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{application.jobTitle}</h3>
                        <p className="text-gray-700 mt-1">{application.companyName}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusVariant[application.status].bg} ${statusVariant[application.status].text} ${statusVariant[application.status].border}`}>
                            {statusVariant[application.status].icon}
                            {application.status}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100/30 text-gray-700 border border-gray-200">
                            {application.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100/30 text-gray-700 border border-gray-200">
                            {application.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Applied {formatDate(application.appliedDate)}</p>
                      <p className="mt-1 font-medium text-gray-900">{application.salary}</p>
                    </div>
                  </div>

                  {expandedId === application.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100/70">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Position Details</h4>
                      <p className="text-gray-700">{application.description}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100/70 px-6 py-4 bg-gray-50/30">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleExpand(application.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100/50 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-150"
                    >
                      {expandedId === application.id ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                          </svg>
                          Show Less
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          View Details
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleWithdraw(application.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-xs text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all duration-150"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;