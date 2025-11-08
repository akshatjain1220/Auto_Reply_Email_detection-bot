import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ children, onLogout, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value); // send search text to parent
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>AutoReplyBot</h1>
        <nav style={styles.nav}>
          <Link
            to="/inbox"
            style={{
              ...styles.navItem,
              ...(isActive("/inbox") ? styles.activeLink : {}),
            }}
          >
            📥 Inbox
          </Link>
          <Link
            to="/templates"
            style={{
              ...styles.navItem,
              ...(isActive("/templates") ? styles.activeLink : {}),
            }}
          >
            🧾 Templates
          </Link>
          <Link
            to="/settings"
            style={{
              ...styles.navItem,
              ...(isActive("/settings") ? styles.activeLink : {}),
            }}
          >
            ⚙️ Settings
          </Link>
        </nav>
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h2 style={styles.pageTitle}>Dashboard</h2>
          <input
            type="text"
            placeholder="Search emails..."
            style={styles.searchBar}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </header>
        <section style={styles.contentBox}>{children}</section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  sidebar: {
    width: "240px",
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    padding: "24px 20px",
    borderRight: "1px solid #e2e8f0",
    boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "40px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  navItem: {
    textDecoration: "none",
    color: "#1e3a8a",
    fontSize: "15px",
    padding: "10px 14px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  activeLink: {
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
  },
  logoutBtn: {
    marginTop: "auto",
    background: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "500",
    marginBottom: "10px",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
  },
  header: {
    background: "#f1f5f9",
    padding: "18px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  pageTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
    color: "#1e3a8a",
  },
  searchBar: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#1e3a8a",
    width: "240px",
    outline: "none",
    fontSize: "14px",
  },
  contentBox: {
    flex: 1,
    padding: "30px",
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    borderRadius: "16px 16px 0 0",
    overflowY: "auto",
  },
};
