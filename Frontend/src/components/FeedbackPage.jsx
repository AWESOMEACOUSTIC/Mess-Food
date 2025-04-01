import React, { useState, useEffect } from "react";

const FeedbackPage = () => {
  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState("student-wise");

  useEffect(() => {
    // Fetch feedback data from the backend
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"}/api/feedback`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feedback data");
        }
        const feedbackData = await response.json();
        setData(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleDownload = (format) => {
    // Dummy functionality: simulate download action
    alert(`Downloading ${reportType} report in ${format} format`);
  };

  return (
    <div className="p-6">
      {/* Report Options */}
      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="reportType" className="text-lg">
          Select Report Type:
        </label>
        <select
          id="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-black"
        >
          <option value="student-wise">Student-wise</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="meal-wise">Meal-wise</option>
        </select>
        <button
          onClick={() => handleDownload("Excel")}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
        <button
          onClick={() => handleDownload("PDF")}
          className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#24263A] shadow rounded-xl table-fixed">
          <thead>
            <tr>
              <th className="w-1/5 px-6 py-3 border-b text-left">ID</th>
              <th className="w-1/5 px-6 py-3 border-b text-left">Student Name</th>
              <th className="w-1/5 px-6 py-3 border-b text-left">Date</th>
              <th className="w-1/5 px-6 py-3 border-b text-left">Meal Type</th>
              <th className="w-1/5 px-6 py-3 border-b text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-500">
                <td className="px-6 py-4 border-b">{item.id}</td>
                <td className="px-6 py-4 border-b">{item.studentName}</td>
                <td className="px-6 py-4 border-b">{item.date}</td>
                <td className="px-6 py-4 border-b">{item.mealType}</td>
                <td className="px-6 py-4 border-b">{item.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackPage;
