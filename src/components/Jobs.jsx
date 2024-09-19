import { useState, useEffect } from "react";

function Jobs() {
  const token = localStorage.getItem("token");
  const [job, setJob] = useState([]);

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

  return (
    <main className="flex-1 p-6">
      <div className="w-full flex flex-col items-center bg-white shadow-md p-6 rounded-lg max-w-5xl mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-6">My Jobs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {job && job.length > 0 ? (
            job.map((each, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">{each.company}</h2>
                <div className="text-lg text-gray-700 mb-2">
                  {each.position}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Status: {each.status}
                </div>
                <div className="text-sm text-gray-500">
                  Created At: {new Date(each.createdAt).toLocaleDateString()}
                </div>
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
