import { Link } from "react-router-dom"
import MenuList from "./MenuList"
import CustomButton from "../CustomButton"
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSelector } from "../../redux/store";


const Navbar = () => {

    const {user} =useSelector((state)=> state.user)
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
    <div className='relative bg-[#f7fdfd] z-50'>
      <nav className='container mx-auto flex items-center justify-between p-5'>
        <div>
          <Link to='/' className='text-blue-600 font-bold text-xl'>
            Job<span className='text-[#1677cccb]'>Finder</span>
          </Link>
        </div>

        <ul className='hidden lg:flex gap-10 text-base'>
          <li>
            <Link to='/'>Find Job</Link>
          </li>
          <li>
            <Link to='/companies'>Companies</Link>
          </li>
          <li>
            <Link to='/upload-job'>Upload Job</Link>
          </li>
          <li>
            <Link to='/about-us'>About</Link>
          </li>
        </ul>

        <div className='hidden lg:block'>
          {!user? (
            <Link to='/user-auth'>
              <CustomButton
                title='Sign In'
                containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'
              />
            </Link>
          ) : (
            <div>
              <MenuList user={user} />
            </div>
          )}
        </div>

        <button
          className='block lg:hidden text-slate-900'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`${
          isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
        } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
      >
        <Link to='/' onClick={handleCloseNavbar}>
          Find Job
        </Link>
        <Link to='/companies' onClick={handleCloseNavbar}>
          Companies
        </Link>
        <Link
          onClick={handleCloseNavbar}
          to={
            user === "seeker" ? "applly-history" : "upload-job"
          }
        >
          {user === "seeker" ? "Applications" : "Upload Job"}
        </Link>
        <Link to='/about-us' onClick={handleCloseNavbar}>
          About
        </Link>

        <div className='w-full py-10'>
          {!user? (
            <a href='/user-auth'>
              <CustomButton
                title='Sign In'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </a>
          ) : (
            <div>
              <MenuList user={user} onClick={handleCloseNavbar} />
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar