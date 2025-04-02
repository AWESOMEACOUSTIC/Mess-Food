import React, { useState, useEffect } from "react";
import { getSystemStats, getAdminList, getAccessLogs } from "../services/api";
import Admin from "../assets/admin.svg";

const FALLBACK_DATA = {
  systemStats: {
    totalUsers: 2458,
    activeUsers: 1842,
    feedbackToday: 187,
    totalFeedback: 12589,
    uptime: "99.8%",
    lastBackup: "2023-04-01T00:00:00.000Z",
    systemVersion: "2.3.5"
  },
  adminList: [
    {
      id: "A002",
      name: "Rahul Yadav",
      email: "rahul@messfood.com",
      role: "Mess Manager",
      status: "Active",
      lastLogin: "2023-04-01T08:15:22.000Z"
    },
    {
      id: "A003",
      name: "Sakshi Singh",
      email: "sakshi@messfood.com",
      role: "Feedback Manager",
      status: "Active",
      lastLogin: "2023-03-31T16:45:12.000Z"
    },
    {
      id: "A004",
      name: "Anjali Sharma",
      email: "anjali@messfood.com",
      role: "Accounts Manager",
      status: "Inactive",
      lastLogin: "2023-03-28T09:10:05.000Z"
    }
  ],
  accessLogs: [
    { action: "User feedback exported", timestamp: "2023-04-01T09:45:22.000Z", admin: "John Doe" },
    { action: "New admin added", timestamp: "2023-03-31T14:30:10.000Z", admin: "John Doe" },
    { action: "System backup", timestamp: "2023-03-31T01:00:00.000Z", admin: "System" },
    { action: "User account disabled", timestamp: "2023-03-30T11:20:45.000Z", admin: "Jane Smith" },
    { action: "Password policy updated", timestamp: "2023-03-29T16:15:30.000Z", admin: "John Doe" }
  ]
};

const AdminInfoPage = () => {

  const [adminData, setAdminData] = useState({
    currentAdmin: {
      id: "A001",
      name: "Sridhar Sinha",
      email: "admin@messfood.com",
      role: "Super Admin",
      accessLevel: "Full Access",
      lastLogin: "2023-04-01T10:30:45.000Z",
      profileImage: Admin
    },
    adminList: [],
    systemStats: {
      totalUsers: 0,
      activeUsers: 0,
      feedbackToday: 0,
      totalFeedback: 0,
      uptime: "0%",
      lastBackup: null,
      systemVersion: "0.0.0"
    },
    accessLogs: []
  });

  const [loading, setLoading] = useState({
    stats: true,
    admins: true,
    logs: true
  });

  const [error, setError] = useState({
    stats: null,
    admins: null,
    logs: null
  });
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Feedback Manager",
    password: "",
    confirmPassword: ""
  });

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  useEffect(() => {
    const fetchSystemStats = async () => {
      try {
        setLoading(prev => ({ ...prev, stats: true }));
        const stats = await getSystemStats();
        setAdminData(prev => ({
          ...prev,
          systemStats: stats
        }));
        setError(prev => ({ ...prev, stats: null }));
      } catch (err) {
        console.error("Failed to fetch system stats:", err);
        
        setAdminData(prev => ({
          ...prev,
          systemStats: FALLBACK_DATA.systemStats
        }));
        
        console.warn("Using fallback system stats data");
        setError(prev => ({ ...prev, stats: null }));
      } finally {
        setLoading(prev => ({ ...prev, stats: false }));
      }
    };

    fetchSystemStats();
  }, []);

  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        setLoading(prev => ({ ...prev, admins: true }));
        const admins = await getAdminList();
        setAdminData(prev => ({
          ...prev,
          adminList: admins
        }));
        setError(prev => ({ ...prev, admins: null }));
      } catch (err) {
        console.error("Failed to fetch admin list:", err);
        
        setAdminData(prev => ({
          ...prev,
          adminList: FALLBACK_DATA.adminList
        }));
        
        console.warn("Using fallback admin list data");
        setError(prev => ({ ...prev, admins: null }));
      } finally {
        setLoading(prev => ({ ...prev, admins: false }));
      }
    };

    fetchAdminList();
  }, []);

  useEffect(() => {
    const fetchAccessLogs = async () => {
      try {
        setLoading(prev => ({ ...prev, logs: true }));
        const logs = await getAccessLogs();
        setAdminData(prev => ({
          ...prev,
          accessLogs: logs
        }));
        setError(prev => ({ ...prev, logs: null }));
      } catch (err) {
        console.error("Failed to fetch access logs:", err);
        setAdminData(prev => ({
          ...prev,
          accessLogs: FALLBACK_DATA.accessLogs
        }));
        
        console.warn("Using fallback access logs data");
        setError(prev => ({ ...prev, logs: null }));
      } finally {
        setLoading(prev => ({ ...prev, logs: false }));
      }
    };

    fetchAccessLogs();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAddAdmin = (e) => {
    e.preventDefault();
    
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const newAdminWithId = {
      id: `A00${adminData.adminList.length + 2}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "Active",
      lastLogin: new Date().toISOString()
    };

    setAdminData(prev => ({
      ...prev,
      adminList: [...prev.adminList, newAdminWithId],
      accessLogs: [
        {
          action: "New admin added",
          timestamp: new Date().toISOString(),
          admin: adminData.currentAdmin.name
        },
        ...prev.accessLogs
      ]
    }));
    setNewAdmin({
      name: "",
      email: "",
      role: "Feedback Manager",
      password: "",
      confirmPassword: ""
    });
    setShowAddAdminForm(false);
  };
  const toggleAdminStatus = (id) => {
    const admin = adminData.adminList.find(a => a.id === id);
    const newStatus = admin.status === "Active" ? "Inactive" : "Active";
    
    setAdminData(prev => ({
      ...prev,
      adminList: prev.adminList.map(admin => 
        admin.id === id 
          ? { ...admin, status: newStatus }
          : admin
      ),
      accessLogs: [
        {
          action: `Admin ${admin.name} ${newStatus === "Active" ? "activated" : "deactivated"}`,
          timestamp: new Date().toISOString(),
          admin: adminData.currentAdmin.name
        },
        ...prev.accessLogs
      ]
    }));
  };
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
      <p>{message}</p>
      <button className="mt-2 text-sm underline" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-full overflow-x-hidden">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 bg-[#24263A] rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">System Statistics</h2>
          
          {loading.stats ? (
            <LoadingSpinner />
          ) : error.stats ? (
            <ErrorMessage message={error.stats} />
          ) : (
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
          )}
        </div>
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

          {loading.admins ? (
            <LoadingSpinner />
          ) : error.admins ? (
            <ErrorMessage message={error.admins} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase text-gray-400 bg-[#2A2A40] rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Login</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {adminData.adminList.map((admin) => (
                    <tr key={admin.id} className="hover:bg-[#2A2A40]/70">
                      <td className="px-4 py-3">{admin.name}</td>
                      <td className="px-4 py-3">{admin.email}</td>
                      <td className="px-4 py-3">{admin.role}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            admin.status === "Active" 
                              ? "bg-green-900/40 text-green-400" 
                              : "bg-red-900/40 text-red-400"
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatDate(admin.lastLogin)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleAdminStatus(admin.id)}
                          className={`text-xs px-2 py-1 rounded ${
                            admin.status === "Active" 
                              ? "bg-red-600 hover:bg-red-700" 
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {admin.status === "Active" ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#24263A] rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent System Activity</h2>
        
        {loading.logs ? (
          <LoadingSpinner />
        ) : error.logs ? (
          <ErrorMessage message={error.logs} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase text-gray-400 bg-[#2A2A40] rounded-t-lg">
                <tr>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Performed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {adminData.accessLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-[#2A2A40]/70">
                    <td className="px-4 py-3">{log.action}</td>
                    <td className="px-4 py-3">{formatDate(log.timestamp)}</td>
                    <td className="px-4 py-3">{log.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInfoPage; 