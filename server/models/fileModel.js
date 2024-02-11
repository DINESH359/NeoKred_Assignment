const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: String,
  content: String
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
