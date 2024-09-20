import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Profile() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `https://jobs-api-backend-c4563190d035.herokuapp.com/api/v1/jobs/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setJobData(data.job);
        setFormData({
          company: data.job.company,
          position: data.job.position,
          status: data.job.status,
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJob();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jobs-api-backend-c4563190d035.herokuapp.com/api/v1/jobs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Job updated successfully!");
      } else {
        toast.error("Failed to update job");
      }
      navigate("/profile");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  //shimmer until we get data
  if (!jobData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center ">Loading...</h1>
          <div className="mb-4  h-6 w-full"></div>
          <div className="mb-4  h-6 w-full"></div>
          <div className="mb-4  h-6 w-full"></div>
          <div className="mb-4  h-6 w-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Company:
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Position:
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
