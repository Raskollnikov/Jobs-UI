import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://jobs-api-backend-c4563190d035.herokuapp.com/api/v1/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ company, position }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        setCompany("");
        setPosition("");
      } else {
        console.error("Failed to add job");
      }
      navigate("/profile");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Job</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="position"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
