import React, { useState, useEffect } from "react";

const FeedbackPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    studentName: "",
    startDate: "",
    endDate: "",
    mealType: ""
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    // Fetch feedback data from the backend
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/feedback`
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
  }, [apiBaseUrl]);

  // Format date from ISO string to DD/MM/YYYY
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  // Filter data based on applied filters
  const filteredData = data.filter(item => {
    // Student name filter (case insensitive)
    if (filters.studentName && !item.studentName.toLowerCase().includes(filters.studentName.toLowerCase())) {
      return false;
    }
    
    // Date range filter - using original ISO dates for comparison
    if (filters.startDate) {
      const itemDate = new Date(item.date);
      const startDate = new Date(filters.startDate);
      if (itemDate < startDate) return false;
    }
    
    if (filters.endDate) {
      const itemDate = new Date(item.date);
      const endDate = new Date(filters.endDate);
      // Set time to end of day for inclusive filtering
      endDate.setHours(23, 59, 59, 999);
      if (itemDate > endDate) return false;
    }
    
    // Meal type filter
    if (filters.mealType && item.mealType !== filters.mealType) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      studentName: "",
      startDate: "",
      endDate: "",
      mealType: ""
    });
  };

  const handleDownload = async (format) => {
    setIsLoading(true);
    
    try {
      if (format === 'csv') {
        // Generate CSV content directly in the frontend
        generateAndDownloadCSV();
      } else {
        // For PDF, still use the backend
        // Create URL with query parameters
        const url = new URL(`${apiBaseUrl}/api/reports`);
        
        // Add format as query parameter
        url.searchParams.append('format', format.toLowerCase());
        
        // Add filter parameters if they exist
        if (filters.studentName) url.searchParams.append('studentName', filters.studentName);
        if (filters.startDate) url.searchParams.append('startDate', filters.startDate);
        if (filters.endDate) url.searchParams.append('endDate', filters.endDate);
        if (filters.mealType) url.searchParams.append('mealType', filters.mealType);
        
        // Fetch the file as a blob
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to download ${format} report`);
        }
        
        // Get the blob from the response
        const blob = await response.blob();
        
        // Create a URL for the blob
        const downloadUrl = window.URL.createObjectURL(blob);
        
        // Create an anchor element and trigger download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `mess_feedback_report.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error(`Error downloading ${format} report:`, error);
      alert(`Failed to download ${format} report: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAndDownloadCSV = () => {
    try {
      // Create CSV header
      let csvContent = "ID,Student Name,Date,Meal Type,Feedback\n";
      
      // Add filtered data rows
      filteredData.forEach(item => {
        // Properly escape fields that might contain commas by enclosing in quotes
        const studentName = item.studentName.includes(',') ? `"${item.studentName}"` : item.studentName;
        const feedback = item.feedback.includes(',') ? `"${item.feedback}"` : item.feedback;
        const formattedDate = formatDate(item.date);
        
        // Build the CSV row
        csvContent += `${item.id},${studentName},${formattedDate},${item.mealType},${feedback}\n`;
      });
      
      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `mess_feedback_report.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert(`Failed to generate CSV: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      {/* Filter Section */}
      <div className="mb-6 p-4 bg-[#24263A] rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Filter Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="studentName" className="block mb-1">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={filters.studentName}
              onChange={handleFilterChange}
              className="w-full p-2 rounded border border-gray-300 bg-black"
              placeholder="Filter by name"
            />
          </div>
          
          <div>
            <label htmlFor="startDate" className="block mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full p-2 rounded border border-gray-300 bg-black"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full p-2 rounded border border-gray-300 bg-black"
            />
          </div>
          
          <div>
            <label htmlFor="mealType" className="block mb-1">Meal Type</label>
            <select
              id="mealType"
              name="mealType"
              value={filters.mealType}
              onChange={handleFilterChange}
              className="w-full p-2 rounded border border-gray-300 bg-black"
            >
              <option value="">All Meals</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Report Options */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <button
          onClick={() => handleDownload("csv")}
          className={`${isLoading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-700'} text-white px-4 py-2 rounded flex items-center`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating CSV...' : 'Download CSV'}
        </button>
        <button
          onClick={() => handleDownload("pdf")}
          className={`${isLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-800'} text-white px-4 py-2 rounded flex items-center`}
          disabled={isLoading}
        >
          {isLoading ? 'Downloading...' : 'Download PDF'}
        </button>
        <div className="ml-auto text-sm text-gray-300">
          Showing {filteredData.length} of {data.length} records
        </div>
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
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-500">
                  <td className="px-6 py-4 border-b">{item.id}</td>
                  <td className="px-6 py-4 border-b">{item.studentName}</td>
                  <td className="px-6 py-4 border-b">{formatDate(item.date)}</td>
                  <td className="px-6 py-4 border-b">{item.mealType}</td>
                  <td className="px-6 py-4 border-b">{item.feedback}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center border-b">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackPage;
