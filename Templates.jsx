import React, { useState } from "react";

export default function Templates() {
  const [mails, setMails] = useState([
    {
      id: 1,
      to: "support@company.com",
      cc: "manager@company.com",
      subject: "Follow-up on Billing Issue",
      message: "Hello, I’m following up on the billing discrepancy for invoice #1234.",
    },
  ]);

  const [newMail, setNewMail] = useState({
    to: "",
    cc: "",
    subject: "",
    message: "",
  });
  const [csvMessage, setCsvMessage] = useState("");

  // Add single mail
  const handleAddMail = (e) => {
    e.preventDefault();
    if (!newMail.to || !newMail.subject || !newMail.message) return;
    const newEntry = { ...newMail, id: mails.length + 1 };
    setMails([...mails, newEntry]);
    setNewMail({ to: "", cc: "", subject: "", message: "" });
  };

  // CSV Upload
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setCsvMessage("❌ Please upload a valid CSV file (to, cc, subject, message).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n");
      const parsed = rows
        .slice(1)
        .map((r, i) => {
          const [to, cc, subject, message] = r.split(",");
          return to && subject && message
            ? {
                id: mails.length + i + 1,
                to: to.trim(),
                cc: cc?.trim() || "",
                subject: subject.trim(),
                message: message.trim(),
              }
            : null;
        })
        .filter(Boolean);

      setMails((prev) => [...prev, ...parsed]);
      setCsvMessage(`✅ Successfully imported ${parsed.length} emails.`);
    };

    reader.readAsText(file);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📧 Compose New Mail</h2>

      {/* CSV Upload */}
      <div style={styles.uploadSection}>
        <label htmlFor="csvUpload" style={styles.uploadLabel}>
          Upload CSV File:
        </label>
        <input type="file" accept=".csv" id="csvUpload" onChange={handleCsvUpload} style={styles.fileInput} />
        {csvMessage && <p style={styles.csvMessage}>{csvMessage}</p>}
      </div>

      {/* Compose Mail Form */}
      <form onSubmit={handleAddMail} style={styles.form}>
        <div style={styles.row}>
          <input
            type="email"
            placeholder="To"
            value={newMail.to}
            onChange={(e) => setNewMail({ ...newMail, to: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="CC"
            value={newMail.cc}
            onChange={(e) => setNewMail({ ...newMail, cc: e.target.value })}
            style={styles.input}
          />
        </div>

        <input
          type="text"
          placeholder="Subject"
          value={newMail.subject}
          onChange={(e) => setNewMail({ ...newMail, subject: e.target.value })}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Write your message..."
          value={newMail.message}
          onChange={(e) => setNewMail({ ...newMail, message: e.target.value })}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          📤 Send Mail
        </button>
      </form>

      {/* Sent Mail List */}
      <h3 style={styles.subTitle}>📬 Sent Mails</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>To</th>
            <th style={styles.th}>CC</th>
            <th style={styles.th}>Subject</th>
            <th style={styles.th}>Message</th>
          </tr>
        </thead>
        <tbody>
          {mails.length > 0 ? (
            mails.map((mail) => (
              <tr key={mail.id} style={styles.tr}>
                <td style={styles.td}>{mail.to}</td>
                <td style={styles.td}>{mail.cc || "-"}</td>
                <td style={styles.td}>{mail.subject}</td>
                <td style={styles.td}>
                  <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{mail.message}</pre>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
                No mails yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "28px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  title: {
    color: "#1e3a8a",
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "20px",
  },
  subTitle: {
    color: "#1e3a8a",
    fontSize: "18px",
    fontWeight: 500,
    marginTop: "30px",
    marginBottom: "10px",
  },
  uploadSection: {
    marginBottom: "20px",
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  uploadLabel: {
    fontWeight: "600",
    color: "#1e3a8a",
    marginRight: "10px",
  },
  fileInput: {
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    padding: "6px",
  },
  csvMessage: {
    marginTop: "8px",
    color: "#166534",
    fontWeight: "500",
  },
  form: {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    minHeight: "140px",
    resize: "vertical",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    background: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    alignSelf: "flex-end",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e5e7eb",
  },
  th: {
    background: "#f1f5f9",
    color: "#1e3a8a",
    fontWeight: "600",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px",
    verticalAlign: "top",
    color: "#1f2937",
  },
};
