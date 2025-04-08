import { BACKEND_URL } from "../config";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import image from "../assests/login-icon.avif";
import toast from "react-hot-toast";

// Signup component to handle user registration
export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  async function signup() {
    try {
      const username = usernameRef.current?.value; // Getting the value of the username input field
      const password = passwordRef.current?.value; // Getting the value of the password input field

      if (!username || !password) {
        toast.error("Please enter both username and password.");
        return;
      }

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      // ✅ Success message for signup
      toast.success("🎉 Signup successful! Please sign in to continue.", {
        duration: 3000,
      });
      navigate("/signin"); // Redirecting to the login page after successful signup
    } catch (error) {
      toast.error("⚠️ Signup failed. Please try again.");
      console.error(error);
    }
  }

  // JSX to render the signup form
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f2d] px-4">
      <div className="bg-gradient-to-br from-[#000046] via-[#1a1a80] to-[#4b6cb7] rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-2">Create New Account</h1>
        <p className="text-gray-300 mb-8 text-sm">
          Sign up to continue to Your Second Brain.
        </p>

        <input
          ref={usernameRef}
          type="username"
          placeholder="Your username"
          className="bg-white text-black px-4 py-3 rounded-md mb-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F77FF] w-full"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Your password"
          className="bg-white text-black px-4 py-3 rounded-md mb-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F77FF] w-full"
        />

        <button
          className="bg-[#4F77FF] hover:bg-[#3A5FE0] text-white py-3 rounded-md font-semibold transition w-full mt-4"
          onClick={signup}
        >
          Signup
        </button>

        <div className="mt-6 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
