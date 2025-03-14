import { createBrowserRouter,Navigate,RouterProvider} from "react-router-dom"
import {
  Layout,
  About,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  AuthPage
} from "./routes";


function App() {

  const user = {
    token: true, 
    accountType: "seeker", 
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/find-jobs" replace /> },
        { path: "/find-jobs", element: <FindJobs /> },
        { path: "/companies", element: <Companies /> },
        {
          path: user?.accountType === "seeker" ? "/user-profile" : "/user-profile/:id",
          element: <UserProfile />,
        },
        { path: "/company-profile", element: <CompanyProfile /> },
        { path: "/company-profile/:id", element: <CompanyProfile /> },
        { path: "/upload-job", element: <UploadJob /> },
        { path: "/job-detail/:id", element: <JobDetail /> },
      ],
    },
    

    { path: "/about-us", element: <About /> },
    { path: "/user-auth", element: <AuthPage /> },

  ]);


  return <RouterProvider router={router} />
}

export default App
