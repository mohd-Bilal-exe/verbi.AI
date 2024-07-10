const express = require('express');
const router = express.Router();
const { Gemini } = require('../api/gemini'); // Adjust the path as necessary

router.post('/summary', async (req, res) => {
    try {
        const prompt = req.body.prompt ? `Summarize this text in 50 words. \n Text: ${req.body.prompt}` : "";
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        console.log(`Request Object: ${req.body.prompt}`);
        console.log(`Response Object: ${text}`);
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message, text:"Gemini here! Sorry! I have a ton of work. Please try again doing that" });
    }
});

router.post('/customPrompt', async (req, res) => {
    try {
        const prompt = req.body.prompt ? `${req.body.prompt}` : "";
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        console.log(`Request Object: ${req.body.prompt}`);
        console.log(`Response Object: ${text}`);
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message, text:"Gemini here! Sorry! I have a ton of work. Please try doing that again" });
    }
});

// Explanation route
router.post('/explanation', async (req, res) => {
    try {
        const prompt = req.body.prompt ? `Explain this text in 50 words. \n Text: ${req.body.prompt} ` : "";
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        console.log(`Response Object: ${text}`);
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message, text:"Gemini here! Sorry! I have a ton of work. Please try doing that again" });
    }
});

// Translation route
router.post('/translate/:lang', async (req, res) => {
    try {
        const lang = req.params.lang;
        const prompt = req.body.prompt ? `Translate this text to ${lang}. \n Text: ${req.body.prompt}` : "";
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        console.log(`Response Object: ${text}`);
        res.status(200).json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message, text:"Gemini here! Sorry! I have a ton of work. Please try doing that again" });
    }
});

// Create hashtags route
router.post('/generate/hashtags', async (req, res) => {
    try {
        const prompt = req.body.prompt ? `Give me 20 creative hashtags that capture the essence and meaning of the text below this is a post for a social media app for writers like a write-up, poem, a para etc from the text below. (don't give anything other than hashtags in a list, provide hashtags only) \n Text: ${req.body.prompt}` : "Write a story about a magic backpack with a house inside. Create 20 hashtags from this as if it was posted on a social media platform for writers.";
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        let text = ' ' + await response.text();
        // Split the text into an array of hashtags
        const hashtags = text.match(/#\S+/g) || [];
        res.status(200).json({ hashtags });
    } catch (error) {
        res.status(500).json({ error: error.message, text: "Gemini here! Sorry! I have a ton of work. Please try doing that again" });
    }
});
// Define sessions object to store chat histories keyed by session IDs
const sessions = {};

router.post('/chat', async (req, res) => {
    try {
        const sessionId = req.body.sessionId; // Client should send a sessionId with each request

        // Check if a new session ID is provided and reset the history
        if (!sessions[sessionId]) {
            sessions[sessionId] = {
                history: [ ]
            };
        }
        let chatHistory = sessions[sessionId].history;
        const chat = await Gemini.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 150
            }
        });
        const msg = req.body.message || "Hi";
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();
        // Update chat history in the session
        chatHistory.push({
            role: "user",
            parts: [{ text: msg }]
        });
        chatHistory.push({
            role: "model",
            parts: [{ text: text }]
        });
        res.status(200).json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, text: "Gemini here! Sorry! I have a ton of work. Please try doing that again" });
    }
});

module.exports = router;
