import { useEffect } from "react";




interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  };

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
    
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to delete this job?
      </h2>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteModal