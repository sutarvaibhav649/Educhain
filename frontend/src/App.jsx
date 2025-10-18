import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import SkillsPage from "./pages/SkillsPage";
import MeetingsPage from "./pages/MeetingsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to skills page */}
        <Route path="/skills" element={<SkillsPage />} />

        {/* Skill Posting Module */}
        <Route path="/skills" element={<SkillsPage />} />

        {/* Meeting Module */}
        <Route path="/meetings" element={<MeetingsPage />} />

        {/* Optional: 404 Page */}
        <Route path="*" element={<h2 className="p-4">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
