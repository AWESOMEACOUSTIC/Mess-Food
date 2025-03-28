// RightShowcase.jsx
import React, { useState } from "react";

function RightShowcase() {
  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    email: "",
    hostelBlock: "",
    roomNumber: "",
    messName: "",
    messType: "",
    terms: false,
  });
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }
    // Display form data (or send to a backend API)
    console.log(formData);
    setMessage("Account created successfully!");

    // Reset form
    setFormData({
      fullName: "",
      registrationNumber: "",
      email: "",
      hostelBlock: "",
      roomNumber: "",
      messName: "",
      messType: "",
      terms: false,
    });
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-gray-900">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4">Create an account</h2>
        <p className="text-gray-400 mb-7">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>

        {/* Success Message */}
        {message && <div className="mb-4 text-green-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-4">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Registration Number */}
          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-medium mb-4"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your registration number"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Hostel Block */}
          <div>
            <label htmlFor="hostelBlock" className="block text-sm font-medium mb-4">
              Hostel Block
            </label>
            <input
              type="text"
              id="hostelBlock"
              name="hostelBlock"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your hostel block"
              value={formData.hostelBlock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Room Number */}
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium mb-4">
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your room number"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mess Name */}
          <div>
            <label htmlFor="messName" className="block text-sm font-medium mb-4">
              Mess Name
            </label>
            <select
              id="messName"
              name="messName"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.messName}
              onChange={handleChange}
              required
            >
              <option value="">Select your mess</option>
              <option value="Darling">Darling</option>
              <option value="Reddy">Reddy</option>
              <option value="PR">PR</option>
            </select>
          </div>

          {/* Mess Type */}
          <div>
            <label className="block text-sm font-medium mb-4">Mess Type</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="messType"
                  value="veg"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={formData.messType === "veg"}
                  onChange={handleChange}
                  required
                />
                <span className="ml-2">Veg</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="messType"
                  value="non-veg"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={formData.messType === "non-veg"}
                  onChange={handleChange}
                  required
                />
                <span className="ml-2">Non-Veg</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="messType"
                  value="special"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={formData.messType === "special"}
                  onChange={handleChange}
                  required
                />
                <span className="ml-2">Special</span>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center ">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-blue-600 mt-4 border-gray-600"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" className="ml-2 mt-4 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-300 hover:underline">
                Terms &amp; Conditions
              </a>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full mt-5 py-3 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-purple-500"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RightShowcase;
