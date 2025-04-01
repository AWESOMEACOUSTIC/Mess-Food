import React, { useState } from "react";
import { loginUser } from "../services/api"; // Import backend login function
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig"; 
import { useNavigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Sign in with email and password using backend API
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await loginUser({ email, password });
      console.log("Login successful:", result);
      // Store user details in localStorage (for example, user id)
      localStorage.setItem("userId", result.user.id);
      // Navigate to home page after successful login
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Sign in with Google using Firebase
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      // Optionally, you could send the Google user info to your backend here
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white w-full h-full px-10 py-7 border-2 border-gray-100 shadow-md">
      <h1 className="text-7xl font-bold text-black">Hola!</h1>
      <h3 className="text-3xl font-semibold mt-9 text-black">Welcome Back</h3>
      <p className="font-medium text-lg text-gray-700 mt-4">
        Please enter your details.
      </p>

      {error && (
        <p className="mt-4 text-red-500 text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleEmailSignIn} className="mt-8 space-y-4">
        <div>
          <label className="block text-lg text-black mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 text-gray-700 border-gray-400 rounded-xl p-4 bg-transparent focus:outline-none focus:border-violet-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-black mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 text-gray-700 border-gray-400 rounded-xl p-4 bg-transparent focus:outline-none focus:border-violet-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 text-white" />
            <label className="text-black font-medium text-base" htmlFor="remember">
              Remember for 30 days
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <button
            type="submit"
            className="w-full text-lg active:scale-95 transition-all p-10 rounded-xl bg-violet-700 text-white font-bold"
          >
            Log In
          </button>
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-y-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-violet-700 flex font-bold items-center justify-center rounded-xl py-3 border-2 border-gray-100 active:scale-95 transition-all"
        >
          <svg
            className="mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.35 11.1h-9.18v2.73h5.27c-.23 1.26-.93 2.33-1.98 3.04v2.53h3.19c1.87-1.73 2.95-4.28 2.95-7.3 0-.64-.06-1.26-.18-1.85z"
              fill="#4285F4"
            />
            <path
              d="M12.17 21c2.7 0 4.97-.9 6.63-2.43l-3.19-2.53c-.88.6-2.02.95-3.44.95-2.65 0-4.89-1.78-5.7-4.17H3.3v2.62A9.97 9.97 0 0012.17 21z"
              fill="#34A853"
            />
            <path
              d="M6.47 12c0-.66.12-1.3.34-1.9V7.48H3.3a10.02 10.02 0 000 8.05l3.51-2.53c-.22-.6-.34-1.24-.34-1.66z"
              fill="#FBBC05"
            />
            <path
              d="M12.17 5.8c1.47 0 2.79.51 3.82 1.51l2.87-2.87C16.12 2.2 14.16 1 12.17 1 7.78 1 4.09 3.24 3.3 7.48l3.51 2.73c.81-2.39 3.05-4.17 5.36-4.17z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-3 items-center">
        <p className="font-medium text-base text-black cursor-pointer">Don't have an account?</p>
        <button className="text-gray-900 rounded-xl bg-gray-300 text-base font-medium ml-2">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Form;
