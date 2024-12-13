import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

const mainPrompt = `
You are a helpful assistant answering questions related to Fantasy Premier League (FPL). Provide the latest player stats, relevant information, and personalized advice to users based on their queries.

When the user provides a query, your response should include:
1. The most relevant player stats and information related to the query.
2. Key recent performances or trends that might impact player selection in FPL.
3. Any relevant news, injuries, transfers, or other events impacting FPL player performance.
4. A clear and concise explanation that answers the user's query.

Your response should be professional, informative, and insightful.
`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with your frontend domain for better security
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST requests are allowed",
    });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({
      error: "Bad Request",
      message: 'The "message" parameter is required in the request body.',
    });
  }

  const specificPrompt = `User Query: ${message}`;
  const prompt = `${mainPrompt}\n${specificPrompt}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with "gpt-4" if needed
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const chatResponse = response.choices[0]?.message?.content || "No response available.";
    res.status(200).json({
      success: true,
      response: chatResponse,
    });
  } catch (error) {
    console.error("Error interacting with OpenAI:", error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Unknown OpenAI API error";
    res.status(status).json({
      error: "OpenAI API Error",
      message,
    });
  }
}
