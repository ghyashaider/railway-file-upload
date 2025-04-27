const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static CSS (if you want to add more later)
app.use(express.static('public'));

// Upload page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Supper Secure File Upload</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f0f0f0;
          }
          .container {
            width: 80%;
            margin: 40px auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            display: flex;
          }
          .sidebar {
            width: 30%;
            background: #5A67D8;
            padding: 20px;
            border-radius: 10px 0 0 10px;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .sidebar img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .sidebar h2 {
            margin: 10px 0 5px;
          }
          .sidebar a {
            margin-top: 20px;
            padding: 10px 20px;
            background: white;
            color: #5A67D8;
            text-decoration: none;
            border-radius: 20px;
            font-weight: bold;
          }
          .content {
            width: 70%;
            padding: 40px;
            text-align: center;
          }
          .content h1 {
            margin-bottom: 30px;
            color: #4A5568;
          }
          .upload-box {
            border: 2px dashed #A0AEC0;
            padding: 30px;
            background: #ebf8ff;
            margin-bottom: 20px;
            border-radius: 10px;
          }
          input[type="file"] {
            display: block;
            margin: 20px auto;
          }
          button {
            background: #ED64A6;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
          }
          button:hover {
            background: #D53F8C;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="sidebar">
            <img src="https://i.imgur.com/rOlAmQv.jpeg" alt="Profile Image"/>
            <h2>Ghyas Haider</h2>
            <p>UI/UX Designer</p>
            <a href="#">Supper Secure</a>
          </div>
          <div class="content">
            <h1>Upload Your Files</h1>
            <form action="/upload" method="POST" enctype="multipart/form-data">
              <div class="upload-box">
                <p>Choose or Drag & Drop your file below</p>
                <input type="file" name="myfile" required />
              </div>
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Handle file uploads
app.post('/upload', upload.single('myfile'), (req, res) => {
  if (req.file) {
    console.log(`Received file: ${req.file.originalname}`);
    res.send(`
      <h2>File "${req.file.originalname}" uploaded successfully.</h2>
      <a href="/">Upload another file</a>
    `);
  } else {
    res.send('No file uploaded.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
