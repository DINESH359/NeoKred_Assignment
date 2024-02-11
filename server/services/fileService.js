const fs = require('fs');
const path = require('path');
const File = require('../models/fileModel');
const connectDB = require('../config/db'); 


connectDB();

function writeFile(content, callback) {
  const folderPath = path.join(__dirname, '..', 'Received_Files'); 
  const currentDate = new Date().toISOString().slice(0, 10).split('-').join('');
  const randomNumber = Math.floor(10000 + Math.random() * 90000); 

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
      callback(err);
    } else {
      const filePath = path.join(folderPath, `${currentDate}_${randomNumber}.html`);
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error('Error writing file:', err);
          callback(err);
        } else {
          console.log('File successfully written:', filePath);
          callback(null, filePath);
        }
      });
    }
  });
}

async function saveFileToMongoDB(content) {
  try {
    const newFile = new File({ filename: `neokred${new Date().toISOString().slice(0,10).replace(/-/g,"")}`, content });

    const savedFile = await newFile.save();
    console.log('File successfully saved to MongoDB:', savedFile);
    return savedFile;
  } catch (error) {
    console.error('Error saving file to MongoDB:', error);
    throw error;
  }
}


module.exports = {
  writeFile,
  saveFileToMongoDB,
};
