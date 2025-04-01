import React, { useState, useEffect } from "react";

const dummyData = [
  { id: "22BCT0043", studentName: "Aditya Panigrahy", date: "2025-03-01", mealType: "Veg", feedback: "Great food!" },
  { id: "22BCI0185", studentName: "K Gourav", date: "2025-03-02", mealType: "Non-Veg", feedback: "Could be better" },
  { id: "22BCI0158", studentName: "Agam Srivastava", date: "2025-03-03", mealType: "Special", feedback: "Loved the special menu" },
  { id: "22BCT0071", studentName: "Rahul Sharma", date: "2025-03-04", mealType: "Veg", feedback: "Really enjoyed the meal!" },
  { id: "22BCI0234", studentName: "Sannidhi Atmakuri", date: "2025-03-05", mealType: "Non-Veg", feedback: "Tasty and well-prepared." },
  { id: "22BCT0099", studentName: "Sai Prasanna", date: "2025-03-06", mealType: "Special", feedback: "Special flavors, truly delightful." },
  { id: "22BCI0112", studentName: "Maya Kapoor", date: "2025-03-07", mealType: "Veg", feedback: "Simple yet satisfying." },
  { id: "22BCT0133", studentName: "Aniket Joshi", date: "2025-03-08", mealType: "Non-Veg", feedback: "Crispy and delicious." },
  { id: "22BCI0177", studentName: "P Sai Pooja", date: "2025-03-09", mealType: "Special", feedback: "Exquisite presentation and taste." },
];

const FeedbackPage = () => {
  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState("student-wise");

  useEffect(() => {
    // Simulate fetching data from a SQL database
    setTimeout(() => {
      setData(dummyData);
    }, 500);
  }, []);

  const handleDownload = (format) => {
    // Dummy functionality: simulate download action
    alert(`Downloading ${reportType} report in ${format} format`);
  };

  return (
    <div className="p-6">
      {/* Report Options */}
      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="reportType" className="text-lg">Select Report Type:</label>
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
