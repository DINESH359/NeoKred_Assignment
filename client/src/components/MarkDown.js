import React, { useState } from 'react';
import {marked} from 'marked'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './MarkDown.css';

function MarkDown() {
  const [markdownInput, setMarkdownInput] = useState('');

  const handleMarkdownChange = (e) => {
    const markdown = e.target.value;
    setMarkdownInput(markdown);
  };

  const htmlOutput = marked(markdownInput);

  return (
    <div>
      <h1>Markdown to HTML Converter with Syntax Highlighting</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '49%' }}>
          <h2 style={{ textAlign: 'center' }}>Markdown Input</h2>
          <textarea
            id="markdown-input"
            style={{ width: '100%', height: '200px' }}
            value={markdownInput}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
        <div style={{ width: '49%' }}>
          <h2 style={{ textAlign: 'center' }}>HTML Output</h2>
          <div style={{ overflow: 'auto', padding: '10px', border: '1px solid #ccc', height: '200px' }}>
            <SyntaxHighlighter language="html" style={solarizedlight}>
              {htmlOutput}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkDown;
