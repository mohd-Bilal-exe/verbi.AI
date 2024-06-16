import { GoogleGenerativeAI } from '@google/generative-ai';


// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyA3kJyE6wCBi7mf81rKxhwROlo-Q5HCEgU");

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const Gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rememberMe = (sessionId, name, nickname, about) => {
    if (!sessions[sessionId]) {
        sessions[sessionId] = { history: [] };
    }
console.log("session is  ", sessionId)
    sessions[sessionId].userDetails = { name, nickname, about };

    sessions[sessionId].history.push({
        role: "user",
        parts: [{ text: `Remember the My name is ${name}, nickname is ${nickname}, and about is ${about}.  Remember to address me with my name` }]
    });
};



const sessions = {};

// Refactored chat function to be used in a front-end context
const chat = async (sessionId, message) => {
    try {
        if (!sessionId) {
            throw new Error("Session ID is required");
        }

        // Initialize session history if not present
        if (!sessions[sessionId]) {
            sessions[sessionId] = { history: [] };
        }

        let chatHistory = sessions[sessionId].history;
        const chatSession = await Gemini.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 5000
            }
        });

        const msg = message || "Hi"; // Default message if none provided
        const result = await chatSession.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();

        // Update chat history in the session
        chatHistory.push({ role: "user", parts: [{ text: msg }] });
        chatHistory.push({ role: "model", parts: [{ text }] });

        return { text };
    } catch (error) {
        console.error(error);
        return { error: error.message, text: "An error occurred. Please try again later." };
    }
};

const translate = async (inputText, lang) => {
    try {
        const prompt = `Translate the text into ${lang}: ${inputText}`;
        const result = await Gemini.generateContent(prompt);
        const response = await result.response;
        return response;
    } catch (error) {
        console.error(error);
        return "Translation error occurred. Please try again later.";
    }
}
const grammarCheck = async (inputText) => {
    try {
        const prompt = `Check the grammar of the following text and provide corrections if any:\n${inputText}`;
        const result = await Gemini.generateContent(prompt);
        const correctedText = await result.response;

        return correctedText;
    } catch (error) {
        console.error(error);
        return "Grammar check error occurred. Please try again later.";
    }
}
export { chat, translate, grammarCheck, rememberMe };
