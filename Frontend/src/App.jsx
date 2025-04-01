import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import SidebarNav from "./components/SidebarNav";
import Home from "./components/Home";
import HeroPage from "./components/HeroPage";
import FeedbackPage from "./components/FeedbackPage"; 

// DashboardLayout wraps the sidebar and main content.
// It uses state to control whether the dashboard or feedback page is shown.
const DashboardLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex w-screen min-h-screen bg-[#1E1E2F] text-gray-100">
      <SidebarNav activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-hidden">
        {activePage === "dashboard" && <DashBoard />}
        {activePage === "feedback" && <FeedbackPage />}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <div className="w-screen min-h-screen">
              <Home />
            </div>
          }
        />
        <Route path="/hero" element={<HeroPage />} />
        {/* Updated dashboard route to use the DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </div>
  );
}

export default App;
