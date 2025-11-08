import React, { useState } from "react";

// Simple, self-contained Login page component
// - Paste this file into src/Pages/loginPage.jsx
// - Import it in your App.jsx or route it with React Router
// - This component uses plain CSS variables and inline styles so it works
//   even if you don't have Tailwind installed.

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    // simple email check
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      // Example API call (uncomment and adjust URL when backend is ready):
      // const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Login failed');
      // localStorage.setItem('token', data.token);

      // Simulate success delay
      await new Promise((r) => setTimeout(r, 800));
      // For demo purposes we'll just store the email
      localStorage.setItem("user_email", email);
      // Redirect or notify parent (replace with navigate from react-router-dom if used)
     if (typeof onLogin === "function") onLogin();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign in</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={styles.input}
              autoComplete="username"
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                style={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={styles.showBtn}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div style={styles.row}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link} onClick={(e) => e.preventDefault()}>
              Forgot?
            </a>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={{ ...styles.submit, opacity: loading ? 0.8 : 1 }} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={styles.footer}>Don't have an account? <a href="#" onClick={(e)=>e.preventDefault()} style={styles.link}>Sign up</a></div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg,#0f172a,#071029)",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "linear-gradient(180deg, #0b1220, #071026)",
    borderRadius: "12px",
    padding: "28px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    color: "#e6eef8",
    border: "1px solid rgba(255,255,255,0.03)",
  },
  title: {
    margin: 0,
    marginBottom: "18px",
    fontSize: "22px",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    color: "#e6eef8",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  showBtn: {
    position: "absolute",
    right: "8px",
    top: "8px",
    padding: "6px 8px",
    borderRadius: "6px",
    background: "transparent",
    border: "none",
    color: "#9fb3d8",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    color: "#9fb3d8",
  },
  checkboxLabel: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  link: {
    color: "#7fb6ff",
    textDecoration: "none",
    fontWeight: 500,
  },
  error: {
    background: "rgba(255,80,80,0.08)",
    color: "#ffb3b3",
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "13px",
  },
  submit: {
    marginTop: "6px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
    color: "white",
    fontWeight: 600,
  },
  footer: {
    marginTop: "14px",
    fontSize: "13px",
    color: "#9fb3d8",
    textAlign: "center",
  },
};
