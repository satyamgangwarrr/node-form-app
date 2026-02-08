const express = require("express");
const bodyParser = require("body-parser");
const { Storage } = require("@google-cloud/storage");

const app = express();
const storage = new Storage();

const BUCKET_NAME = "cloud-assigment-01";
const CSV_FILE = "responses/form_responses.csv";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/submit", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email.trim().toLowerCase();
    const message = req.body.message || "";
    const timestamp = new Date().toISOString();

    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(CSV_FILE);

    let csvData = "name,email,message,timestamp\n";
    let emailExists = false;
    let generation = 0;

    const [exists] = await file.exists();

    if (exists) {
      const [metadata] = await file.getMetadata();
      generation = metadata.generation;

      const [content] = await file.download();
      csvData = content.toString();

      const rows = csvData.trim().split("\n").slice(1);
      for (const row of rows) {
        const match = row.match(/"([^"]*)","([^"]*)"/);
        if (match && match[2] === email) {
          return res.status(409).send("You have already submitted.");
        }
      }
    }

    const safeMessage = message.replace(/"/g, '""');
    csvData += `"${name}","${email}","${safeMessage}","${timestamp}"\n`;

    // 🔒 GENERATION LOCK (THIS IS THE FIX)
    await file.save(csvData, {
      contentType: "text/csv",
      preconditionOpts: exists ? { ifGenerationMatch: generation } : {},
    });

    res.send("Form submitted successfully");

  } catch (err) {
    if (err.code === 412) {
      // Another request modified file first
      return res.status(409).send("Duplicate submission detected. Try again.");
    }

    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


