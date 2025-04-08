import { Sidebar } from "../components/Sidebar"; // Importing Sidebar component for navigation
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

// Dashboard component that renders the main page
export function Dashboard() {
  // State to manage the modal visibility
  // const { contents, refresh } = useContent()

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1 min-h-screen pl-16 md:pl-72">
          <Navbar />
          <div className="px-4 py-4 flex-1 text-lg bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
          
    </>
  );
}
