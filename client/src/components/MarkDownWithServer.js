

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './MarkDownWithServer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import config from '../config'; 

const socket = io(config.serverUrl); 

function MarkDownWithServer() {
  const [markdownInput, setMarkdownInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const outputContainerRef = useRef(null);

  useEffect(() => {
    console.log('Connecting to socket server...');
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('html', (html) => {
      console.log('Received HTML from server:', html);
      setHtmlOutput(html);
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    });

    return () => {
      socket.off('html');
    };
  }, []);

  const handleMarkdownChange = (e) => {
    const markdown = e.target.value;
    console.log('Markdown input changed:', markdown);
    setMarkdownInput(markdown);
    socket.emit('markdown', markdown);
  };

  const handleCopyCode = () => {
    const el = document.createElement('textarea');
    el.value = htmlOutput;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleRenderInNewTab = () => {
    const newTab = window.open();
    newTab.document.body.innerHTML = htmlOutput;
  };

  const handleWriteToFile = () => {
    fetch(`${config.serverUrl}/file/writeToFile`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: htmlOutput }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File successfully written:', data);
        alert('File successfully written.');
      })
      .catch((error) => {
        console.error('Error writing file:', error);
      });
  };

  const handleSaveToMongoDb = () => {
          fetch(`${config.serverUrl}${config.fileWriteEndpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: htmlOutput }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('File successfully written and saved to MongoDB:', data.savedFile._id);
              alert('File successfully written and saved to MongoDB  with document id : ' +data.savedFile._id);
            })
            .catch((error) => {
              console.error('Error writing file and saving to MongoDB:', error);
            });
        };
        

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Markdown to HTML Converter</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: '45%', marginRight: '10px' }}>
          <h2 style={{ textAlign: 'center' }}>Markdown Input</h2>
          <textarea
            id="markdown-input"
            style={{ width: '100%', height: '350px' }}
            value={markdownInput}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
        <div style={{ width: '45%' }}>
          <h2 style={{ textAlign: 'center' }}>HTML Output</h2>
          <div ref={outputContainerRef} style={{ overflow: 'auto', padding: '10px', border: '1px solid #ccc', height: '338px' }}>
          
            {htmlOutput && typeof htmlOutput === 'string' && (
              <>
                <button className="copy-button" onClick={handleCopyCode} style={{ marginBottom: '10px' }}>Copy Code</button>
                <button className="render-button" onClick={handleRenderInNewTab} style={{ marginBottom: '10px' }}>Render in New Tab</button>
                <button className="write-file-button" onClick={handleWriteToFile} style={{ marginBottom: '10px' }}>Write to File</button>
                <button className="save-to-mongodb-button" onClick={handleSaveToMongoDb} style={{ marginBottom: '10px' }}>Save to MongoDB</button>
              </>
            )}
            <SyntaxHighlighter language="html" style={solarizedlight}>
              {htmlOutput}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkDownWithServer;
