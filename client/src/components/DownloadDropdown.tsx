import { useState } from "react";

interface CvUrlProp{
    CVUrl: string | undefined;
}
const DownloadDropdown = ({CVUrl}:CvUrlProp) => {
    
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      className="flex items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isOpen && (
      <a className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-100"
       href={CVUrl}
       onClick={() =>
        setTimeout(() => {
          setIsOpen(false);
        }, 1000)
      }
      >
        <button
          className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </button>
      </a>
    )}
  </div>
  )
}

export default DownloadDropdown