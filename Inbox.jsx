import React, { useEffect, useState } from "react";
import { getEmails, addEmail } from "../api/emailApi";

export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [form, setForm] = useState({ sender: "", subject: "", body: "" });
  const [file, setFile] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null); // NEW: selected email
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const data = await getEmails();
      setEmails(data || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmail = async () => {
    if (!form.sender || !form.subject || !form.body) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await addEmail(form);
      setForm({ sender: "", subject: "", body: "" });
      loadEmails();
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert("Please choose a CSV file first.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/import/emails", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("CSV imported successfully!");
        loadEmails();
      } else {
        alert("Failed to import CSV file.");
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ color: "#003366", marginBottom: "20px" }}>📥 Inbox</h2>

      {/* Add Email Form */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          name="sender"
          value={form.sender}
          onChange={handleChange}
          placeholder="Sender"
          style={styles.input}
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          style={styles.input}
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Body"
          rows="1"
          style={{ ...styles.input, width: "30%" }}
        />
        <button onClick={handleAddEmail} style={styles.addButton}>
          ➕ Add Email
        </button>
      </div>

      {/* Upload CSV */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleFileUpload} style={styles.uploadButton}>
          📤 Upload CSV
        </button>
      </div>

      {/* Email Table */}
      <table style={styles.table}>
        <thead>
          <tr style={{ background: "#003366", color: "white" }}>
            <th style={styles.th}>Sender</th>
            <th style={styles.th}>Subject</th>
            <th style={styles.th}>Intent</th>
            <th style={styles.th}>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {emails.length > 0 ? (
            emails.map((email, i) => (
              <tr
                key={i}
                onClick={() => setSelectedEmail(email)} // open modal
                style={{ cursor: "pointer", transition: "0.2s", ...styles.tr }}
              >
                <td style={styles.td}>{email.sender}</td>
                <td style={styles.td}>{email.subject}</td>
                <td style={styles.td}>{email.intent || "Unknown"}</td>
                <td style={styles.td}>
                  {email.confidence
                    ? `${Math.round(email.confidence)}%`
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: "15px", textAlign: "center" }}>
                No emails found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedEmail && (
        <div style={styles.overlay} onClick={() => setSelectedEmail(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#003366" }}>📧 Email Details</h3>
            <p><strong>Sender:</strong> {selectedEmail.sender}</p>
            <p><strong>Subject:</strong> {selectedEmail.subject}</p>
            <p><strong>Body:</strong> {selectedEmail.body || "No content"}</p>
            <p>
              <strong>Confidence:</strong>{" "}
              {selectedEmail.confidence
                ? `${Math.round(selectedEmail.confidence)}%`
                : "N/A"}
            </p>
            <button
              onClick={() => setSelectedEmail(null)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "20%",
  },
  addButton: {
    background: "#003366",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  uploadButton: {
    background: "#1e88e5",
    color: "white",
    padding: "8px 18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#f8f9fa",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    background: "white",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "450px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
  closeButton: {
    marginTop: "15px",
    background: "#003366",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
