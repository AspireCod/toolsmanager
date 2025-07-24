const express = require('express');
const path = require('path');
const multer = require('multer');
const { db } = require('./db');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: File to upload
 *     responses:
 *       200:
 *         description: Successfully uploaded
 */
router.post('/upload', upload.single('file'), (req, res) => {
  const { originalname, filename, mimetype } = req.file;
  db.run(
    'INSERT INTO files (originalname, filename, mimetype) VALUES (?, ?, ?)',
    [originalname, filename, mimetype],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

/**
 * @swagger
 * /files:
 *   get:
 *     summary: List uploaded files
 *     responses:
 *       200:
 *         description: List of files
 */
router.get('/files', (req, res) => {
  db.all('SELECT * FROM files', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Download file by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File stream
 */
router.get('/files/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM files WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    const filePath = path.join(__dirname, 'uploads', row.filename);
    res.download(filePath, row.originalname);
  });
});

module.exports = router;
