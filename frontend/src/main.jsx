import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import SkillPage from "./pages/SkillPage"; // fixed
import MeetingPage from "./pages/MeetingPage";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/skills" />} />
        <Route path="/skills" element={<SkillPage />} />
        <Route path="/meetings" element={<MeetingPage />} />
        <Route path="*" element={<h2 className="p-4">404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
