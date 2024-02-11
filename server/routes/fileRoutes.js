const express = require('express');
const fileService = require('../services/fileService');

const router = express.Router();

router.post('/writeToFile', (req, res) => {
  const { content } = req.body;
  fileService.writeFile(content, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error writing file' });
    } else {
      res.json({ success: true });
    }
  });
});

router.post('/writeToFileAndSaveToMongo', async (req, res) => {
  try {
    const { content } = req.body;
    const savedFile = await fileService.saveFileToMongoDB(content);
    res.json({ success: true, savedFile });
  } catch (error) {
    console.error('Error writing file and saving to MongoDB:', error);
    res.status(500).json({ error: 'Error writing file and saving to MongoDB' });
  }
});


module.exports = router;
