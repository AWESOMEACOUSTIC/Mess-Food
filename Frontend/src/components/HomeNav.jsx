import React from "react";

function NavBar({ userData }) {
  return (
    <header className="bg-gray-900 p-4 border-b border-gray-700 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        {userData ? `Welcome, ${userData.name}!` : "Loading..."}
      </h1>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <span className="text-white text-sm">JD</span>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
