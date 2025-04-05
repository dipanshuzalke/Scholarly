import { Sidebar } from '../components/Sidebar' // Importing Sidebar component for navigation
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

// Dashboard component that renders the main page
export function Dashboard () {
  // State to manage the modal visibility
  // const { contents, refresh } = useContent()

  return (
    <>
<div className="flex min-h-screen relative">
  {/* Sidebar - Fixed and hidden on mobile, visible on md+ */}
  <Sidebar />

  {/* Main Content (takes full width on mobile, pushed on md+) */}
  <div className="flex flex-col flex-1 md:ml-72 w-full">
    {/* Navbar */}
    <Navbar />

    {/* Content Area */}
    <div className="pl-4 pr-4 bg-gray-100 flex-1">
      <Outlet />
    </div>
  </div>
</div>

    </>
  )
}
