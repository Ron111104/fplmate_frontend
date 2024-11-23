// pages/api/predictRating.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        // Make the POST request to the backend using axios
        const response = await axios.post("http://127.0.0.1:8000/predict-rating", req.body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        // Log the response data
        console.log("Data:", response.data);

        // Return the response data with the same status code
        res.status(response.status).json(response.data);
      } catch (error) {
        console.error("Error:", error);

        // Handle error gracefully
        if (error.response) {
          res.status(error.response.status).json({ error: error.response.data });
        } else {
          res.status(500).json({ error: "Failed to fetch prediction" });
        }
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
}
