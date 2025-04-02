const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Register a new user.
 * @param {Object} userData 
 * @returns {Promise<Object>} 
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
}

/**
 * Submit a mess suggestion.
 * @param {Object} suggestionData - 
 * @returns {Promise<Object>} 
 */
export async function submitSuggestion(suggestionData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suggestionData)
    });
    if (!response.ok) {
      throw new Error('Failed to submit suggestion');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in submitSuggestion:", error);
    throw error;
  }
}

/**
 * Download a report in the specified format.
 * @param {string} format - 
 * @param {string} [reportType='all'] 
 * @returns {Promise<Blob>} 
 */
export async function downloadReport(format, reportType = 'all') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports?format=${format}&reportType=${reportType}`);
    if (!response.ok) {
      throw new Error('Failed to download report');
    }
    return await response.blob();
  } catch (error) {
    console.error("Error in downloadReport:", error);
    throw error;
  }
}

/**
 * Fetch aggregated dashboard data.
 * @returns {Promise<Object[]>} 
 */
export async function getDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard`);
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    throw error;
  }
}

/**
 * Fetch all feedback suggestions.
 * @returns {Promise<Object[]>} 
 */
export async function getFeedback() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedback`);
    if (!response.ok) {
      throw new Error("Failed to fetch feedback data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getFeedback:", error);
    throw error;
  }
}

/**
 * Log in an existing user.
 * @param {Object} loginData - 
 * @returns {Promise<Object>} 
 */
export async function loginUser(loginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Invalid email or password");
    }
    
    return data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
}

/**
 * Fetch system statistics for admin dashboard.
 * @returns {Promise<Object>} 
 */
export async function getSystemStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/system-stats`);
    if (!response.ok) {
      throw new Error("Failed to fetch system statistics");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getSystemStats:", error);
    throw error;
  }
}

/**
 * Fetch admin user list.
 * @returns {Promise<Object[]>} 
 */
export async function getAdminList() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admins`);
    if (!response.ok) {
      throw new Error("Failed to fetch admin list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getAdminList:", error);
    throw error;
  }
}

/**
 * Fetch system access logs.
 * @param {number} limit - Number of logs to fetch.
 * @returns {Promise<Object[]>} 
 */
export async function getAccessLogs(limit = 5) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/access-logs?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch access logs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getAccessLogs:", error);
    throw error;
  }
}