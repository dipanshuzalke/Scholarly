import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom' // Importing useNavigate for navigation
import image from '../assests/login-icon.avif'
import toast from 'react-hot-toast'

// Signup component to handle user registration
export function Signup () {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate() // Hook to programmatically navigate to different routes

  async function signup () {
    try {
      const username = usernameRef.current?.value // Getting the value of the username input field
      const password = passwordRef.current?.value // Getting the value of the password input field

      if (!username || !password) {
        toast.error('Please enter both username and password.')
        return
      }

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
      })
      // ✅ Success message for signup
      toast.success('🎉 Signup successful! Please sign in to continue.', {
        duration: 3000
      })
      navigate('/signin') // Redirecting to the login page after successful signup
    } catch (error) {
      toast.error('⚠️ Signup failed. Please try again.')
      console.error(error)
    }
  }

  // JSX to render the signup form
  return (
    <div className='h-screen flex'>
      {/* Left Half - Signin Form */}
      <div className='w-1/2 h-full bg-[#0d0d0d] flex flex-col justify-center px-28 py-10 text-white shadow-md'>
        <h1 className='text-3xl font-bold mb-2'>Create New Account</h1>
        <p className='text-gray-400 mb-8 text-sm'>
          Sign up to your account to continue to Your Second Brain.
        </p>

        {/* Google Login
        <button className='flex items-center justify-center gap-3 bg-white text-black py-2 px-4 rounded-md mb-3 hover:bg-gray-100 transition'>
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='Google'
            className='h-5 w-5'
          />
          Log in with Google
        </button>

        <button className='flex items-center justify-center gap-3 bg-white text-black py-2 px-4 rounded-md mb-6 hover:bg-gray-100 transition'>
          <img
            src='https://www.svgrepo.com/show/303128/apple-logo.svg'
            alt='Apple'
            className='h-5 w-5'
          />
          Log in with Apple
        </button> */}

        {/* <div className='text-center text-sm text-gray-500 mb-4'>or</div> */}

        {/* Email input */}
        <input
          ref={usernameRef}
          type='username'
          placeholder='Your username'
          className='bg-[#1a1a1a] text-white px-4 py-3 rounded-md mb-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600'
        />

        {/* Password input */}
        <input
          ref={passwordRef} // ✅ Use 'ref' not 'reference'
          type='password'
          placeholder='Your password'
          className='bg-[#1a1a1a] text-white px-4 py-3 rounded-md mb-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600'
        />

        {/* <div className='text-right text-xs text-purple-400 mb-6 cursor-pointer hover:underline'>
          Forgot password?
        </div> */}

        {/* Login button */}
        <button
          className='bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition mt-6'
          onClick={signup}
        >
          Signup
        </button>

        <div className='mt-6 text-sm text-gray-400 text-center'>
          Already have an account?{' '}
          <span
            className='text-purple-400 hover:underline cursor-pointer'
            onClick={() => navigate('/signin')}
          >
            Login
          </span>
        </div>
      </div>

      <div className='w-1/2 flex flex-col justify-center items-center px-10 text-center text-white relative bg-gradient-to-br from-blue-700 via-blue-300 to-blue-700'>
        <div className='z-10'>
          <h1 className='text-5xl md:text-6xl font-extrabold mb-6'>
            📚{' '}
            <span className='bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent'>
              Your Second Brain
            </span>
          </h1>
          <p className='text-xl md:text-2xl font-semibold max-w-2xl mb-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent'>
            Organize everything — notes, tweets, videos, code, and more. All in
            one place. All powered by AI.
          </p>
        </div>

        {/* Foreground image */}
        <img
          src={image}
          alt='Productivity'
          className='z-10 max-h-[300px] w-auto mt-10 rounded-lg shadow-2xl'
        />
      </div>
    </div>
  )
}
