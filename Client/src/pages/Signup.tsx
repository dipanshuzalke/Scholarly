import { Button } from "../components/Button"; // Importing Button component for the submit button
import { Input } from "../components/Input"; // Importing Input component for form fields
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

// Signup component to handle user registration
export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes

    async function signup() {
        const username = usernameRef.current?.value; // Getting the value of the username input field
        const password = passwordRef.current?.value; // Getting the value of the password input field
        await axios.post(`${BACKEND_URL}/api/v1/signup`, 
             {
                username, 
                password
            
        })
        navigate("/signin"); // Redirecting to the signin page after successful signup
        alert("User created successfully"); // Alerting the user upon successful signup
    }

    // JSX to render the signup form
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                {/* Input for username */}
                <Input reference={usernameRef} placeholder="Username" />
                
                {/* Input for password */}
                <Input reference={passwordRef} placeholder="Password" />

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                    <Button size="md" onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
                </div>
            </div>
        </div>
    );
}