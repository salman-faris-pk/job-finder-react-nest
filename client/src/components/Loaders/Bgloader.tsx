import { AiOutlineLoading } from "react-icons/ai";


const Bgloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-slate-700 z-50">
    <AiOutlineLoading className="w-12 h-12 text-gray-300 animate-spin" />
  </div>
  )
}

export default Bgloader