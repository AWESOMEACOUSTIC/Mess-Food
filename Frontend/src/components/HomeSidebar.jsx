import React, { useState } from "react";
import HomeIcon from "../assets/home-1.svg";
import SettingIcon from "../assets/setting-2.svg"


const NavItem = ({ icon, label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer 
      rounded-md transition-colors 
      ${isActive ? "bg-[#2A2A40]" : "hover:bg-[#2A2A40]/50"}`}
  >
    <img
      src={icon}
      alt={`${label} icon`}
      className="w-6 h-6 object-contain"
    />
    <span className="text-base text-gray-200">{label}</span>
  </div>
);

const HomeSidebar = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavItemClick = (page) => {
    setActivePage(page);
    // Additional logic 
  };

  return (
    <nav className="w-78 bg-[#1B1B2D] flex flex-col">
    
      <div className="flex items-center gap-3 px-4 py-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/16c881aef9af6ec86aa400103d24dd3bf02cb5c5"
          alt="Mess Food Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-3xl font-bold text-white">MESS FOOD</p>
      </div>

      <div className="flex flex-col mt-4 space-y-2 px-2">
        <NavItem
          icon={HomeIcon}
          label="Home"
          isActive={activePage === "Home"}
          onClick={() => handleNavItemClick("Home")}
        />
        <NavItem
          icon={SettingIcon}
          label="Settings"
          isActive={activePage === "Settings"}
          onClick={() => handleNavItemClick("Settings")}
        />
      </div>

      <div className="mt-auto mb-4 mx-2 border-b border-gray-700"></div>

      <div className="flex items-center justify-between px-4 pb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://photosrush.com/wp-content/uploads/dp-for-whatsapp-no-dp.jpg"
            alt="Admin avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-base text-white">User</span>
        </div>
        <div className="flex items-center gap-4">
          
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/558910e7186b2cea6943e8805e77b013965faad2"
            alt="LogOut"
            className="w-5 h-5 object-contain cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default HomeSidebar;
