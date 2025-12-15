const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv/lib/main").config();
const removeBackground = require("./removeBg");

const app = express();
app.use(cors());
app.use(express.json());

// Make uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Upload model image
app.post("/upload-model", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Upload dress and remove background
app.post("/upload-dress", upload.single("image"), async (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/clean-${req.file.filename}`;

  await removeBackground(inputPath, outputPath);

  res.json({ imageUrl: `http://localhost:5000/uploads/clean-${req.file.filename}` });
});

// Optional: save try-on
// POST /save-tryon logic can go here (e.g., MongoDB)

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
