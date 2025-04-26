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
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 md:from-blue-600 to-indigo-700 p-6 sm:p-12 text-white"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Welcome to Our Platform</h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
              Join thousands of professionals who trust our solution for their job needs.
            </p>
            <ul className="space-y-3 sm:space-y-4 hidden sm:block">
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Secure & reliable infrastructure
              </li>
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Enterprise-grade features
              </li>
              <li className="flex items-center">
                <span className="mr-3 bg-white/20 p-1 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                24/7 dedicated support
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12"
        >
            <SignUp />
            
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
