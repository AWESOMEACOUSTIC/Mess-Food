// LeftShowcase.jsx
import React from "react";

function LeftShowcase() {
  return (
    <div className="hidden lg:flex w-1/2 relative items-center justify-center">
      {/* Background image */}
      <img
        src="dunes.jpg"
        alt="Dunes Background"
        className="absolute w-full h-full object-cover"
      />
    
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Logo (top-left) */}
      <div className="absolute top-0 left-0 p-4 flex items-center space-x-2 z-10">
        
        <span className="text-xl font-semibold text-white">MESS FOOD</span>
      </div>

      {/* "Back to website" button (top-right) */}
      <button
        className="absolute top-0 right-0 m-4 text-white flex items-center space-x-2 px-4 py-2 rounded hover:bg-white/10 z-10"
      >
        <span>Back to website</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586L10.293 5.707a1 1 0 111.414-1.414l4.999 5a1 1 0 010 1.414l-4.999 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

  
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl font-semibold mb-2 text-white">
          Capturing Moments,
        </h2>
        <h2 className="text-3xl font-semibold text-white">
          Creating Memories
        </h2>
      </div>
    </div>
  );
}

export default LeftShowcase;
