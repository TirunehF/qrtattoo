exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "This is a test message from your Netlify Function!" })
  };
};

// In content-api.js
exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const { type, value } = JSON.parse(event.body);
    // Save the content type and value to your configuration storage (could be a file for simplicity)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Content updated successfully!", type, value })
    };
  }
  // Return the current content settings when GET request is made
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify Function!" })
  };
};
