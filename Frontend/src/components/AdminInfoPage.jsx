import React, { useState } from "react";

const AdminInfoPage = () => {
  // Sample admin data
  const [adminData, setAdminData] = useState({
    currentAdmin: {
      id: "A001",
      name: "John Doe",
      email: "admin@messfood.com",
      role: "Super Admin",
      accessLevel: "Full Access",
      lastLogin: "2023-04-01T10:30:45.000Z",
      profileImage: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    adminList: [
      {
        id: "A002",
        name: "Jane Smith",
        email: "jane@messfood.com",
        role: "Mess Manager",
        status: "Active",
        lastLogin: "2023-04-01T08:15:22.000Z"
      },
      {
        id: "A003",
        name: "Mike Johnson",
        email: "mike@messfood.com",
        role: "Feedback Manager",
        status: "Active",
        lastLogin: "2023-03-31T16:45:12.000Z"
      },
      {
        id: "A004",
        name: "Sarah Williams",
        email: "sarah@messfood.com",
        role: "Accounts Manager",
        status: "Inactive",
        lastLogin: "2023-03-28T09:10:05.000Z"
      }
    ],
    systemStats: {
      totalUsers: 2458,
      activeUsers: 1842,
      feedbackToday: 187,
      totalFeedback: 12589,
      uptime: "99.8%",
      lastBackup: "2023-04-01T00:00:00.000Z",
      systemVersion: "2.3.5"
    },
    accessLogs: [
      { action: "User feedback exported", timestamp: "2023-04-01T09:45:22.000Z", admin: "John Doe" },
      { action: "New admin added", timestamp: "2023-03-31T14:30:10.000Z", admin: "John Doe" },
      { action: "System backup", timestamp: "2023-03-31T01:00:00.000Z", admin: "System" },
      { action: "User account disabled", timestamp: "2023-03-30T11:20:45.000Z", admin: "Jane Smith" },
      { action: "Password policy updated", timestamp: "2023-03-29T16:15:30.000Z", admin: "John Doe" }
    ]
  });

  // State for add admin form
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Feedback Manager",
    password: "",
    confirmPassword: ""
  });

  // Format date from ISO string to readable format
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add admin submission
  const handleAddAdmin = (e) => {
    e.preventDefault();
    
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Create new admin object with generated ID
    const newAdminWithId = {
      id: `A00${adminData.adminList.length + 2}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "Active",
      lastLogin: new Date().toISOString()
    };

    // Update admin list with new admin
    setAdminData(prev => ({
      ...prev,
      adminList: [...prev.adminList, newAdminWithId]
    }));

    // Reset form and hide it
    setNewAdmin({
      name: "",
      email: "",
      role: "Feedback Manager",
      password: "",
      confirmPassword: ""
    });
    setShowAddAdminForm(false);
  };

  // Toggle admin status (active/inactive)
  const toggleAdminStatus = (id) => {
    setAdminData(prev => ({
      ...prev,
      adminList: prev.adminList.map(admin => 
        admin.id === id 
          ? { ...admin, status: admin.status === "Active" ? "Inactive" : "Active" }
          : admin
      )
    }));
  };

  return (
    <div className="p-6 max-w-full overflow-x-hidden">
      {/* Admin Profile Card */}
      <div className="mb-8 bg-[#24263A] rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img 
            src={adminData.currentAdmin.profileImage} 
            alt="Admin profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{adminData.currentAdmin.name}</h1>
            <p className="text-gray-300">{adminData.currentAdmin.email}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                {adminData.currentAdmin.role}
              </span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                {adminData.currentAdmin.accessLevel}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-gray-400 text-sm">Last login</p>
            <p className="text-white">{formatDate(adminData.currentAdmin.lastLogin)}</p>
          </div>
        </div>
      </div>

      {/* System Stats & Admin Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* System Stats */}
        <div className="md:col-span-1 bg-[#24263A] rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">System Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Users</span>
              <span className="text-white font-semibold">{adminData.systemStats.totalUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Users</span>
              <span className="text-white font-semibold">{adminData.systemStats.activeUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Today's Feedback</span>
              <span className="text-white font-semibold">{adminData.systemStats.feedbackToday.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Feedback</span>
              <span className="text-white font-semibold">{adminData.systemStats.totalFeedback.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">System Uptime</span>
              <span className="text-white font-semibold">{adminData.systemStats.uptime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Last Backup</span>
              <span className="text-white font-semibold">{formatDate(adminData.systemStats.lastBackup)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">System Version</span>
              <span className="text-white font-semibold">{adminData.systemStats.systemVersion}</span>
            </div>
          </div>
        </div>

        {/* Admin Management */}
        <div className="md:col-span-2 bg-[#24263A] rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Admin Management</h2>
            <button 
              onClick={() => setShowAddAdminForm(!showAddAdminForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
            >
              {showAddAdminForm ? "Cancel" : "Add Admin"}
            </button>
          </div>

          {/* Add Admin Form */}
          {showAddAdminForm && (
            <form onSubmit={handleAddAdmin} className="mb-6 bg-[#2A2A40] p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newAdmin.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newAdmin.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm text-gray-400 mb-1">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={newAdmin.role}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  >
                    <option value="Mess Manager">Mess Manager</option>
                    <option value="Feedback Manager">Feedback Manager</option>
                    <option value="Accounts Manager">Accounts Manager</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={newAdmin.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-black text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add Admin
                </button>
              </div>
            </form>
          )}

          {/* Admin List */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#2A2A40] rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Last Login</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminData.adminList.map((admin) => (
                  <tr key={admin.id} className="hover:bg-[#31314a]">
                    <td className="px-4 py-3 text-sm text-gray-200">{admin.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-200">{admin.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-200">{admin.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-200">{admin.role}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        admin.status === "Active" 
                          ? "bg-green-600 text-white" 
                          : "bg-red-600 text-white"
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-200">{formatDate(admin.lastLogin)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => toggleAdminStatus(admin.id)}
                          className={`px-2 py-1 rounded text-xs ${
                            admin.status === "Active" 
                              ? "bg-red-600 hover:bg-red-700 text-white" 
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          {admin.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#24263A] rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <div className="space-y-4">
          {adminData.accessLogs.map((log, index) => (
            <div key={index} className="flex items-start border-b border-gray-700 pb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-white">{log.action}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">By {log.admin}</span>
                  <span className="text-gray-400">{formatDate(log.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInfoPage; 