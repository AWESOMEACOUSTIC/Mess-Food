import React, { useState } from "react";

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

const SidebarNav = () => {
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
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0d75d0190c95a0a9d4134ad1327a81cd2f0e2898"
          label="Dashboard"
          isActive={activePage === "dashboard"}
          onClick={() => handleNavItemClick("dashboard")}
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/8412544178c17f0308b6ddc7abecc0e8cf507edc"
          label="User's Feedback"
          isActive={activePage === "feedback"}
          onClick={() => handleNavItemClick("feedback")}
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ed49fd1dbb43b9a23a48aa259aa5d5616f2033ae"
          label="Admin Info"
          isActive={activePage === "admin"}
          onClick={() => handleNavItemClick("admin")}
        />
      </div>

      <div className="mt-auto mb-4 mx-2 border-b border-gray-700"></div>

      <div className="flex items-center justify-between px-4 pb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/77d37ce61c9d6742b40f2407970ad7d46dbb41fc"
            alt="Admin avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-base text-white">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28b5ce91310d33e320372c787cf57a840523fd15"
            alt="Settings"
            className="w-5 h-5 object-contain cursor-pointer"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/558910e7186b2cea6943e8805e77b013965faad2"
            alt="Notifications"
            className="w-5 h-5 object-contain cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
