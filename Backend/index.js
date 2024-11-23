const express = require("express");
const multer = require("multer");
// const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({
  origin: ["https://file-morpher-frontend.vercel.app"]
}));

app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Function to add password protection to PDF
const addPasswordProtection = async (pdfPath, password) => {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Add password protection to the PDF
  pdfDoc.encrypt({ userPassword: password, ownerPassword: password });

  // Extract filename without extension
  const fileNameWithoutExt = path.parse(pdfPath).name;
  const protectedPdfPath = path.join(
    path.dirname(pdfPath),
    `${fileNameWithoutExt}-protected.pdf`
  );

  // Save the protected PDF
  const protectedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(protectedPdfPath, protectedPdfBytes);

  return protectedPdfPath;
};

// Endpoint to handle file upload and conversion
app.post("/convertFile", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Extract original file name (without extension)
  const originalFileNameWithoutExt = path.parse(req.file.originalname).name;

  const filePath = path.join(__dirname, "uploads", req.file.filename);
  const outputPdfPath = path.join(
    __dirname,
    "uploads",
    `${originalFileNameWithoutExt}.pdf`
  );

  // Convert DOCX to PDF
  docxToPDF(filePath, outputPdfPath, async (err) => {
    if (err) {
      return res.status(500).send("Error converting the file.");
    }

    // If password is provided, add password protection to the PDF
    if (req.body.password) {
      const protectedPdfPath = await addPasswordProtection(
        outputPdfPath,
        req.body.password
      );
      const protectedFileMetadata = {
        name: path.basename(protectedPdfPath),
        size: fs.statSync(protectedPdfPath).size,
        createdAt: fs.statSync(protectedPdfPath).birthtime,
      };

      res.json({
        convertedFileMetadata: protectedFileMetadata,
        fileDownloadUrl: `/uploads/${protectedFileMetadata.name}`,
      });
    } else {
      const convertedFileMetadata = {
        name: path.basename(outputPdfPath),
        size: fs.statSync(outputPdfPath).size,
        createdAt: fs.statSync(outputPdfPath).birthtime,
      };

      res.json({
        convertedFileMetadata: convertedFileMetadata,
        fileDownloadUrl: `/uploads/${convertedFileMetadata.name}`,
      });
    }
  });
});

// Serve the converted files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
