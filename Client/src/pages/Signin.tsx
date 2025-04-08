import { useRef } from "react"; // Importing useRef for referencing DOM elements
import { BACKEND_URL } from "../config"; // Importing backend URL from config
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation after login
import image from "../assests/image.jpg";
import toast from "react-hot-toast";

// Signin component to handle user login
export function Signin() {
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signin() {
    const username = usernameRef.current?.value; // Getting the value of the username input field
    const password = passwordRef.current?.value; // Getting the value of the password input field

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    const jwt = response.data.token; // Extracting JWT from the response
    localStorage.setItem("token", jwt); // Storing JWT in local storage for authentication
    navigate("/"); // Redirecting to the dashboard after successful login
  }

  // JSX to render the signin form
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f2d] px-4">
      <div className=" bg-gradient-to-br from-[#000046] via-[#1a1a80] to-[#4b6cb7] rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-gray-300 mb-8 text-sm">
          Log in to your account to continue to Your Second Brain.
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

        <div className="text-right text-xs text-white mb-6 cursor-pointer hover:underline">
          Forgot password?
        </div>

        <button
          className="bg-[#4F77FF] hover:bg-[#3A5FE0] text-white py-3 rounded-md font-semibold transition w-full"
          onClick={signin}
        >
          Log in
        </button>

        <div className="mt-6 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
