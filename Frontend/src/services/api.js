const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Register a new user.
 * @param {Object} userData - The user data to be sent to the backend.
 * @returns {Promise<Object>} The JSON response from the backend.
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
 * @param {Object} suggestionData - The suggestion data to be sent to the backend.
 * @returns {Promise<Object>} The JSON response from the backend.
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
 * @param {string} format - The format of the report ('excel' or 'pdf').
 * @param {string} [reportType='all'] - The report type (e.g., student-wise, monthly, etc.).
 * @returns {Promise<Blob>} The downloaded file as a blob.
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
 * @returns {Promise<Object[]>} The JSON response with aggregated dashboard data.
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
 * @returns {Promise<Object[]>} The JSON response with feedback data.
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
 * @param {Object} loginData - An object containing email and password.
 * @returns {Promise<Object>} The JSON response from the backend.
 */
export async function loginUser(loginData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    if (!response.ok) {
      // Throwing an error so the frontend can catch it and display an alert
      throw new Error("Invalid email or password");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
}