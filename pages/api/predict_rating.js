import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Define the URLs
      const devUrl = process.env.DEV_URL;
      const prodUrl = process.env.PROD_URL;

      if (!devUrl && !prodUrl) {
        return res.status(500).json({ error: "No valid URL configured" });
      }

      // Try the DEV_URL first
      let baseUrl = devUrl;
      let response;

      try {
        // Make the POST request to the backend using axios
        response = await axios.post(`${baseUrl}/predict-rating`, req.body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log("Error with DEV_URL:", error.message);

        // If DEV_URL fails, try PROD_URL
        if (prodUrl) {
          baseUrl = prodUrl;
          response = await axios.post(`${baseUrl}/predict-rating`, req.body, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          throw error; // If PROD_URL is not available, rethrow the error
        }
      }

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
