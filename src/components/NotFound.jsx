import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRedirect = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-red-500 text-white">
      <div className="text-center p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-lg">
        <h1 className="text-9xl font-extrabold animate-pulse mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-white text-pink-500 hover:bg-pink-600 hover:text-white px-8 py-3 font-semibold rounded-full transition duration-300"
        >
          Go to {token ? "Profile" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
