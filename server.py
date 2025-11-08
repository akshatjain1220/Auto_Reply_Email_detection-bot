# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Email
from db_utils import init_db
import random

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///emails.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)
init_db(app)

# Simple intent classifier
def classify_intent(text):
    text = text.lower()
    if "invoice" in text or "payment" in text:
        return "Billing", round(random.uniform(0.8, 0.95), 2)
    elif "error" in text or "crash" in text:
        return "Bug", round(random.uniform(0.8, 0.95), 2)
    elif "feature" in text or "add" in text:
        return "Feature", round(random.uniform(0.8, 0.95), 2)
    elif "help" in text or "support" in text:
        return "Support", round(random.uniform(0.8, 0.95), 2)
    else:
        return "Unknown", round(random.uniform(0.4, 0.6), 2)

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/emails", methods=["GET"])
def get_emails():
    emails = Email.query.all()
    return jsonify([
        {
            "id": e.id,
            "sender": e.sender,
            "subject": e.subject,
            "body": e.body,
            "intent": e.intent,
            "confidence": e.confidence
        }
        for e in emails
    ])

@app.route("/api/emails", methods=["POST"])
def add_email():
    data = request.get_json()
    sender = data.get("sender")
    subject = data.get("subject")
    body = data.get("body")

    intent, confidence = classify_intent(f"{subject} {body}")
    email = Email(sender=sender, subject=subject, body=body, intent=intent, confidence=confidence)
    db.session.add(email)
    db.session.commit()

    return jsonify({"message": "Email added successfully", "intent": intent, "confidence": confidence})

if __name__ == "__main__":
    app.run(debug=True)
