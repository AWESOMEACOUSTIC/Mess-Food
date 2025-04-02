import React, { useState } from "react";
import { loginUser } from "../services/api"; 
import { useNavigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await loginUser({ email, password });
      console.log("Login successful:", result);
      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("fullname", result.user.fullname);
      localStorage.setItem("email", result.user.email);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2 text-white" disabled={isLoading} />
            <label className="text-black font-medium text-base" htmlFor="remember">
              Remember for 30 days
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className={`w-full text-lg active:scale-95 transition-all p-10 rounded-xl ${
              isLoading ? "bg-violet-500" : "bg-violet-700"
            } text-white font-bold`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>

      <div className="mt-8 flex justify-center gap-3 items-center">
        <p className="font-medium text-base text-black cursor-pointer">Don't have an account?</p>
        <button 
          onClick={() => navigate("/register")} 
          className="text-gray-900 rounded-xl bg-gray-300 text-base font-medium ml-2 px-3 py-1"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Form;
