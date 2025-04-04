import { Signin } from "./pages/Signin"; // Importing the Signin page component
import { Signup } from "./pages/Signup"; // Importing the Signup page component
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importing Router components from react-router-dom for routing
import { Dashboard } from "./pages/dashboard"; // Importing the Dashboard page component
import { Navigate } from "react-router-dom"; // Importing Navigate for redirection
import { NotesPage } from "./pages/sub-pages/Notes"; // Importing the Notes page component
import { TwitterPage } from "./pages/sub-pages/Twitter";
import { YoutubePage } from "./pages/sub-pages/Youtube";
import { LinkedinPage } from "./pages/sub-pages/Linkedin";
import { GithubPage } from "./pages/sub-pages/Github";
import { OtherPage } from "./pages/sub-pages/OtherPage";
import { AllContent } from "./pages/sub-pages/AllContent";

// App component to define the routing structure of the application
function App() {
  return (
<BrowserRouter>
  <Routes>
    {/* Public Routes */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />

    {/* Protected Routes with Nested Pages */}
    <Route path="/" element={<Dashboard />}>
      <Route index element={<AllContent />} />
      <Route path="notes" element={<NotesPage />} />
      <Route path="twitter" element={<TwitterPage />} />
      <Route path="youtube" element={<YoutubePage />} />
      <Route path="linkedin" element={<LinkedinPage />} />
      <Route path="github" element={<GithubPage />} />
      <Route path="other" element={<OtherPage />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App; // Exporting the App component as the default export