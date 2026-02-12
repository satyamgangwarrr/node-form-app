# Node Form App (Google Cloud VM)

A simple and reliable Node.js contact form application deployed on a Google Cloud Virtual Machine.  
This project demonstrates how a basic web application can be integrated with Google Cloud Storage while following cloud-native security and backend validation practices.

The application allows users to submit their name, email address, and message through a web form. Each submission is stored in Google Cloud Storage in CSV format along with a timestamp. To maintain clean data, the backend prevents duplicate submissions from the same email address.

The project is intentionally kept minimal to focus on understanding backend workflows, cloud deployment, IAM-based authentication, and safe handling of concurrent requests.

## Features

- Contact form with name, email, and message
- Backend validation to block duplicate submissions
- Data stored in Google Cloud Storage as CSV
- Uses VM default service account (no hardcoded credentials)
- Deployed on Google Cloud Compute Engine
- Simple and easy to understand codebase

## Technology Stack

- Node.js  
- Express.js  
- HTML & CSS  
- Google Cloud Storage  
- Google Compute Engine (VM)

## Project Structure

node-form-app/  
├── index.js  
├── package.json  
├── package-lock.json  
├── public/  
│   └── form.html  
├── .gitignore  
└── README.md  

## Running the Application

Install dependencies:

npm install  

Start the server:

node index.js  

The application will be available at:

http://localhost:3000  

## Access on Google Cloud VM

After deploying the app on a Google Cloud VM and allowing the required firewall port, the application can be accessed publicly using:

http://<VM_EXTERNAL_IP>:3000 
My url : http://34.19.56.228:3000/

This URL can be shared with others.

## Data Storage

All form submissions are stored in a CSV file inside a Google Cloud Storage bucket:

gs://cloud-assigment-01/responses/form_responses.csv  

Each record contains the user’s name, email, message, and submission timestamp.  
If an email address is already present, further submissions using the same email are rejected.

## Security

The application does not store any credentials or API keys in the repository.  
Access to Google Cloud Storage is handled using the VM’s default IAM service account.  
Sensitive files such as node_modules are excluded using .gitignore.

## Notes

This project uses CSV storage for simplicity and learning purposes.  
For production-ready systems, database solutions like Firestore or Cloud SQL are recommended.

## Author

Satyam Gangwar  

This project was built to learn and demonstrate backend development and cloud deployment concepts.
