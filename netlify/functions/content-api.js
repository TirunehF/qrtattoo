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
  
  // Handle GET request to return current content in appropriate format
  if (event.httpMethod === 'GET') {
    switch (currentContentType) {
      case 'text':
        return {
          statusCode: 200,
          headers: { "Content-Type": "text/html" },
          body: `<html><body><p>${currentContentValue}</p></body></html>`
        };
      case 'image':
        return {
          statusCode: 302,
          headers: { Location: currentContentValue }
        };
      case 'video':
        return {
          statusCode: 200,
          headers: { "Content-Type": "text/html" },
          body: `<html><body><video src="${currentContentValue}" autoplay loop></video></body></html>`
        };
      default:
        return {
          statusCode: 400,
          body: "Content type not supported"
        };
    }
  }

  // Default response for other methods
  return {
    statusCode: 405,
    body: "Method not allowed"
  };
};
