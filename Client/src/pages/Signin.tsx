import { useRef } from "react"; // Importing useRef for referencing DOM elements
import { Button } from "../components/Button"; // Importing Button component for the submit button
import { Input } from "../components/Input"; // Importing Input component for form fields
import { BACKEND_URL } from "../config"; // Importing backend URL from config
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation after login

// Signin component to handle user login
export function Signin() {
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin() {
        const username = usernameRef.current?.value; // Getting the value of the username input field
        const password = passwordRef.current?.value; // Getting the value of the password input field
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, 
             {
                username, 
                password
            
        })
        const jwt = response.data.token; // Extracting JWT from the response
        localStorage.setItem("token", jwt); // Storing JWT in local storage for authentication
        navigate("/dashboard"); // Redirecting to the dashboard after successful login
    }

    // JSX to render the signin form
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                {/* Input for username */}
                <Input reference={usernameRef} placeholder="Username" />
                
                {/* Input for password */}
                <Input reference={passwordRef} placeholder="Password" />

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                    <Button size="md"  onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
                </div>
            </div>
        </div>
    );
}