# 🚀 Node Form App – Google Cloud VM Deployment
A simple and clean Node.js contact form application running on a Google Cloud Virtual Machine. The application stores form submissions in Google Cloud Storage (CSV format) and prevents duplicate submissions using backend validation.

✨ Features
- Contact form with Name, Email & Message
- Stores responses in Google Cloud Storage
- Prevents duplicate submissions (same email)
- Handles concurrent requests safely
- Deployed on Google Cloud VM
- Uses VM default service account (no secrets in code)

🛠️ Tech Stack
- Node.js
- Express.js
- Google Cloud Storage
- HTML / CSS
- Google Compute Engine (VM)

📁 Project Structure
node-form-app/
├── index.js
├── package.json
├── package-lock.json
├── public/
│   └── form.html
├── .gitignore
└── README.md

⚙️ How to Run Locally
Install dependencies:
npm install

Start the server:
node index.js

Application will run on:
http://localhost:3000

🌐 Access on Google Cloud VM
After deploying to a Google Cloud VM and opening the firewall port:
http://<VM_EXTERNAL_IP>:3000

🗂️ Data Storage
Form submissions are stored as a CSV file in Google Cloud Storage:
gs://cloud-assigment-01/responses/form_responses.csv

Each submission contains:
Name, Email, Message, Timestamp
Duplicate submissions using the same email are blocked.

📄 Sample CSV Data
name,email,message,timestamp
Satyam,satyam@email.com,Hello!,2026-02-08T10:25:30Z

🔒 Security Notes
No credentials committed to repository. Uses Google Cloud VM IAM role. Sensitive files excluded using .gitignore.

⚠️ Limitations
CSV storage is suitable for learning and small-scale usage. For large-scale or production systems, consider Firestore or Cloud SQL.

🚀 Future Improvements
Deploy on Cloud Run, replace CSV with Firestore, add email verification, add admin dashboard, enable HTTPS with domain.

👨‍💻 Author
Satyam Gangwar
Built as part of Google Cloud & backend learning.

⭐ Star this repository if you find it helpful!
