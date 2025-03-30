import React from "react";

const HomeStats = ({ suggestionsCount }) => {
  return (
    <div className="bg-[#1E1F25] p-4 rounded-md mb-6 flex flex-col md:flex-row items-center md:items-start gap-4">
      
      <div className="flex-1">
        <p className="text-lg font-semibold mb-2">Total Feedback Given</p>
        <h2 className="text-4xl font-bold">{suggestionsCount}</h2>
      </div>
      
      {/* <div className="flex-1 w-full md:w-auto h-24 bg-gradient-to-r from-pink-600 to-pink-800 rounded-md flex items-center justify-center">
        <span className="opacity-70 text-sm">[Chart Placeholder]</span>
      </div> */}
    </div>
  );
};

export default HomeStats;
