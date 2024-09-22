// pages/api/hello.js

export default async function handler(req, res) {
  try {
      // Send a request to the Django endpoint
      const response = await fetch('http://127.0.0.1:8000/hello');
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Get the JSON data from the response
      const data = await response.json();

      // Send the data as the response to the API request
      res.status(200).json(data);
  } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
  }
}
