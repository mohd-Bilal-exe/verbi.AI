const express = require("express");
const router = express.Router();
const { Gemini } = require("../api/gemini"); // Adjust the path as necessary
const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];
const sessions = {};

// Grammar Check Route
router.post("/grammarCheck", async (req, res) => {
  try {
    const prompt = `Check the grammar of the following text and provide corrections if any: "${
      req.body.prompt
    }" \n \n ${
      customInstructions &&
      `answer according to the following instructions : ${req.body.customInstructions}`
    } `;
    const result = await Gemini.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();
    console.log(`Request Object: ${req.body.prompt}`);
    console.log(`Response Object: ${text}`);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      text: "Gemini here! Sorry! I have a ton of work. Please try again doing that",
    });
  }
});

// Translation Route
router.post("/translate/:lang", async (req, res) => {
  try {
    const lang = req.params.lang;
    const prompt = req.body.prompt
      ? `Translate this text to ${lang}: "${req.body.prompt}"`
      : "";
    const result = await Gemini.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();
    console.log(`Response Object: ${text}`);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      text: "Gemini here! Sorry! I have a ton of work. Please try doing that again",
    });
  }
});

// Chat Route
router.post("/chat", async (req, res) => {
  try {
    const sessionId = req.body.sessionId;

    // Check if a new session ID is provided and reset the history
    if (!sessions[sessionId]) {
      sessions[sessionId] = { history: [] };
    }
    let chatHistory = sessions[sessionId].history;
    const chat = await Gemini.startChat({
      history: chatHistory,
      generationConfig,
      safetySettings,
    });
    const msg = req.body.message || "Hi";
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = await response.text();
    // Update chat history in the session
    chatHistory.push({ role: "user", parts: [{ text: msg }] });
    chatHistory.push({ role: "model", parts: [{ text }] });
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
      text: "Gemini here! Sorry! I have a ton of work. Please try doing that again",
    });
  }
});

module.exports = router;
