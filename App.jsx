import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage";
import DashboardLayout from "./Pages/DashboardLayout";
import Inbox from "./Pages/Inbox";
import Templates from "./Pages/Templates";

const Settings = () => (
  <div style={{ padding: "20px", color: "#1e3a8a" }}>
    <h2>⚙️ Settings</h2>
    <p>Here you can manage preferences and configurations.</p>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleSearch = (query) => setSearchQuery(query);

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <Router>
      <DashboardLayout onLogout={handleLogout} onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<Navigate to="/inbox" />} />
          <Route path="/inbox" element={<Inbox searchQuery={searchQuery} />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;