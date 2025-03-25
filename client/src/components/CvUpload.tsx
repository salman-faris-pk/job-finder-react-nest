import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { JobApply } from '../apis/uploads.apis';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string | undefined;
    JobId: string | undefined;
}

const CvUpload = ({ isOpen, onClose, userId, JobId }: ApplyModalProps) => {

    const [file, setFile] = useState<File | null>(null);
    const [isLoading,setLoading]=useState(false)
    const [hireReason, setHireReason] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf' || 
                selectedFile.name.endsWith('.docx')) {
                setFile(selectedFile);
            } else {
                alert('Please upload a PDF or DOCX file');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
    
            if (!file) {
                toast.info("Please upload your resume/CV");
                setLoading(false);
                return;
            }
    
            if (!userId || !JobId) {
                throw new Error("User ID and Job ID are required.");
            }
    
            const applyData = {
                userId,
                JobId,
                CvUrl: file,
                whyHire: hireReason,
            };
    
            const response = await JobApply(applyData);
    
            if (response?.success) {
                toast.success(response.message);
                setTimeout(() => {
                    window.location.reload();
                    onClose();
                }, 1000);
            } else {
                toast.error(response?.message || "Something went wrong. Please try again.");
                onClose();
            }
        } catch (error) {
            console.error("Job application failed:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    

       useEffect(() => {
            if (isOpen) {
              window.scrollTo({ top: 0, behavior: "auto" });
    
              document.body.classList.add("overflow-hidden");
            } else {
              document.body.classList.remove("overflow-hidden");
            }
            
            return () => document.body.classList.remove("overflow-hidden");
          }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">

                    <h2 className="text-xl font-bold mb-4">Apply The Job</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Resume/CV (PDF or DOCX)*
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.docx"
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Why should we hire you? (Optional)
                    </label>
                    <textarea
                        value={hireReason}
                        onChange={(e) => setHireReason(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us why you'd be a great fit for this position..."
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium
                                  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                                  focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm
                                  font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
                                  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                        {isLoading ? "submitting.." : "Submit Application"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CvUpload;