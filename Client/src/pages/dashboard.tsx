import { Sidebar } from '../components/Sidebar' // Importing Sidebar component for navigation
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

// Dashboard component that renders the main page
export function Dashboard () {
  // State to manage the modal visibility
  // const { contents, refresh } = useContent()

  return (
    <>
      <div className='flex min-h-screen'>
        {/* Sidebar - Fixed on the Left */}
        <Sidebar />

        {/* Main Content (Navbar + Page Content) */}
        <div className='flex flex-col flex-1 ml-64'>
          {/* Navbar - Fixed at the top */}
          <Navbar />

          {/* Content Area */}
          <div className='pl-6 pr-4 bg-gray-50 min-h-screen ml-5'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
