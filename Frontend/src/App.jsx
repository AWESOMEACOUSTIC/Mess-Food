import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import SidebarNav from "./components/SidebarNav";
import Home from "./components/Home";
import HeroPage from "./components/HeroPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={ <div className="w-screen min-h-screen">
        <Home /> </div>} />
        <Route path="/hero" element={<HeroPage/>}/>
        <Route
          path="/dashboard"
          element={
            <div className="flex w-screen min-h-screen bg-[#1E1E2F] text-gray-100">
              <SidebarNav />
              <div className="flex-1 overflow-auto">
                <DashBoard />
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
export default App;