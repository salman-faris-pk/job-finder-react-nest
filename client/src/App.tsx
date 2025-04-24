import { lazy, Suspense, ReactNode } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import {
  Layout,
  About,
  Companies,
  FindJobs,
  UploadJob,
  AuthPage,
  ErrorBoundary,
} from "./routes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { fetchUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "./redux/store";
import Loading from './components/Loaders/Loading';

const CompanyProfile = lazy(() => import("./routes/CompanyProfile"));
const UserProfile = lazy(() => import("./routes/UserProfile"));
const JobDetail = lazy(() => import("./routes/JobDetail"));
const Applications = lazy(() => import("./routes/Applications"));

interface LazyRouteProps {
  element: ReactNode;
}

const LazyRoute = ({ element }: LazyRouteProps) => (
  <Suspense fallback={<div><Loading /></div>}>
    {element}
  </Suspense>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary/>,
      children: [
        { path: "/", element: <Navigate to="/find-jobs" replace /> },
        { path: "/find-jobs", element: <FindJobs /> },
        { path: "/companies", element: <Companies /> },
        { 
          path: "/user-profile", 
          element: user?.accountType === "seeker" ? 
            <LazyRoute element={<UserProfile />} /> : 
            <Navigate to="/" replace /> 
        },
        { 
          path: "/user-profile/:id", 
          element: <LazyRoute element={<UserProfile />} /> 
        },
        { 
          path: "/company-profile", 
          element: <LazyRoute element={<CompanyProfile />} /> 
        },
        { 
          path: "/company-profile/:id", 
          element: <LazyRoute element={<CompanyProfile />} />,
        },
        { 
          path: "/applicants", 
          element: <LazyRoute element={<Applications />} /> 
        },
        { path: "/upload-job", element: <UploadJob /> },
        { 
          path: "/job-detail/:id", 
          element: <LazyRoute element={<JobDetail />} /> 
        },
        { path: "/about-us", element: <About /> },
      ],
    },
    { path: "/user-auth", element: <AuthPage /> },
  ]);

  return (
    <>
      <Toaster 
        position="top-center"
        richColors
        duration={3000}
      />
      <RouterProvider router={router} 
      />
    </>
  );
}

export default App;
