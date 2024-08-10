import React, { useState } from 'react';

function App() {
  const [contentType, setContentType] = useState('text'); // Default content type
  const [contentValue, setContentValue] = useState(''); // Content to display

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Netlify Function to update the content
    const response = await fetch('/.netlify/functions/content-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: contentType, value: contentValue }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>QR Code Content Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Content Type:
          <select value={contentType} onChange={e => setContentType(e.target.value)}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label>
          Content:
          <input
            type="text"
            value={contentValue}
            onChange={e => setContentValue(e.target.value)}
            placeholder="Enter your content based on type selected"
          />
        </label>
        <button type="submit">Update Content</button>
      </form>
    </div>
  );
}

export default App;
