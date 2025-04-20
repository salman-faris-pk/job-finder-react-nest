import SignUp from "../components/SignUp";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../redux/store";
import { Bgloader } from "../components";
import { motion } from "framer-motion";

const AuthPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  if (loading) {
    return <Bgloader />;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding/Info */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12 text-white"
      >
        <div className="max-w-md">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of professionals who trust our solution for their job needs.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Secure & reliable infrastructure
              </li>
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Enterprise-grade features
              </li>
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                24/7 dedicated support
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >

          <SignUp />
          
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;

