import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import ProfileLayout from "./components/ProfileLayout";
import Jobs from "./components/Jobs";
import CreateJob from "./components/CreateJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Jobs /> },
      { path: "add-job", element: <CreateJob /> },
      { path: ":id", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
