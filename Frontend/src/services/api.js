const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

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
