const {marked} = require('marked');

const convertMarkdownToHTML = (markdownInput) => {
    const htmlOutput = marked(markdownInput);
    return htmlOutput;
};

module.exports = { convertMarkdownToHTML };
