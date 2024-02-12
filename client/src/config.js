// config.js

const config = {
  serverUrl: process.env.REACT_APP_SERVER_URL || 'http://localhost:3001',
   fileWriteEndpoint: process.env.REACT_APP_FILE_WRITE_ENDPOINT || '/file/writeToFileAndSaveToMongo',
  mongodbUrl: process.env.REACT_APP_MONGODB_URL || 'mongodb://localhost:27017/neokred',
  // Add more configuration variables as needed
};

export default config;
