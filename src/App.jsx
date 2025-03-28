import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import SidebarNav from "./components/SidebarNav";

function App() {
  return (
    <div className="">
      {/* <Login /> */}
    {/* <Signup/> */}
    {/* <DashBoard/> */}
    <div className="flex w-screen min-h-screen bg-[#1E1E2F] text-gray-100">
      <SidebarNav />
      <div className="flex-1 overflow-auto">
        <DashBoard />
      </div>
    </div>
    </div>
  );
}
export default App;