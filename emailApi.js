const API_BASE = "http://127.0.0.1:5000/api";

export async function getEmails() {
  const res = await fetch(`${API_BASE}/emails`);
  return res.json();
}

export async function addEmail(emailData) {
  const res = await fetch(`${API_BASE}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  });
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}
