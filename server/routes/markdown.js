const express = require('express');
const router = express.Router();
const {marked} = require('marked');
const { convertMarkdownToHTML } = require('../services/markdown');


const markdownRouter = (io,socket) => {
    
  socket.on('markdown', (markdownInput) => {
        const htmlOutput = convertMarkdownToHTML(markdownInput, marked);
        io.emit('html', htmlOutput);     
  });
};

module.exports = markdownRouter;
