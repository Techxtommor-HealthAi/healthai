import express, { json } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent([prompt]);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
