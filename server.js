const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve a basic HTML upload form
app.get('/', (req, res) => {
  res.send(`
    <h2>Upload a File</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Handle file uploads
app.post('/upload', upload.single('myfile'), (req, res) => {
  if (req.file) {
    console.log(`Received file: ${req.file.originalname}`);
    res.send(`File "${req.file.originalname}" uploaded successfully.`);
  } else {
    res.send('No file uploaded.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
