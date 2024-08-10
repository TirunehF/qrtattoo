// Define global variables to hold content type and value
let currentContentType = 'text'; // default type
let currentContentValue = 'Hello from Netlify Function!'; // default message

exports.handler = async function(event, context) {
  // Handle POST request to update content
  if (event.httpMethod === 'POST') {
    const { type, value } = JSON.parse(event.body);
    currentContentType = type;
    currentContentValue = value;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Content updated successfully!" })
    };
  }
  
  // Handle GET request to return current content
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: currentContentType, value: currentContentValue })
    };
  }

  // Default response for other methods
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed" })
  };
};
