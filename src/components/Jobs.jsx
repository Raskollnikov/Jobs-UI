import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io"; // Close icon
import { Link } from "react-router-dom";

function Jobs() {
  const token = localStorage.getItem("token");
  const [job, setJob] = useState([]);
  const [hamburgerState, setHamburgerState] = useState({});

  useEffect(() => {
    const getJob = async () => {
      try {
        const jobs = await fetch(
          "https://jobs-api-backend-c4563190d035.herokuapp.com/api/v1/jobs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (jobs.ok) {
          const response = await jobs.json();
          setJob(response.allJobs);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    if (token) {
      getJob();
    }
  }, [token]);

  const toggleHamburger = (jobId) => {
    setHamburgerState((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://jobs-api-backend-c4563190d035.herokuapp.com/api/v1/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setJob((prevJobs) => prevJobs.filter((job) => job._id !== id));
      } else {
        console.error("Failed to delete the job");
      }
    } catch (error) {
      console.error("Error deleting the job:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-300 text-gray-800"; // Yellow for pending
      case "interview":
        return "bg-green-300 text-gray-800"; // Green for interview
      case "declined":
        return "bg-red-600 text-white"; // Red for declined
      default:
        return "";
    }
  };

  return (
    <main className="flex-1 p-6">
      <div className="w-full flex flex-col items-center bg-white shadow-md p-6 rounded-lg max-w-5xl mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-6">My Jobs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {job && job.length > 0 ? (
            job.map((each) => (
              <div
                key={each._id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white relative"
              >
                <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
                  {each.company}
                  {hamburgerState[each._id] ? (
                    <IoMdClose
                      className="cursor-pointer"
                      onClick={() => toggleHamburger(each._id)}
                    />
                  ) : (
                    <GiHamburgerMenu
                      className="cursor-pointer"
                      onClick={() => toggleHamburger(each._id)}
                    />
                  )}
                </h2>
                <div className="text-lg text-gray-700 mb-2">
                  {each.position}
                </div>
                <div
                  className={`text-sm w-[140px] mb-2 p-2 rounded-lg font-semibold ${getStatusStyle(
                    each.status
                  )} shadow-md`}
                >
                  Status: {each.status}
                </div>
                <div className="text-sm text-gray-500">
                  Created At: {new Date(each.createdAt).toLocaleDateString()}
                </div>

                {hamburgerState[each._id] && (
                  <div className="absolute top-10 right-2 bg-white shadow-md rounded-lg p-2 border border-gray-200">
                    <button
                      className="flex items-center px-2 py-1 hover:bg-gray-100 text-gray-700"
                      onClick={() => {
                        console.log("Edit clicked for", each._id);
                      }}
                    >
                      <FaRegEdit className="mr-2" color="green" />
                      <Link to={`/profile/${each._id}`}>Edit</Link>
                    </button>
                    <button
                      className="flex items-center px-2 py-1 hover:bg-gray-100 text-gray-700"
                      onClick={() => handleDelete(each._id)}
                    >
                      <RiDeleteBin5Line color="red" className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No jobs available.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Jobs;
