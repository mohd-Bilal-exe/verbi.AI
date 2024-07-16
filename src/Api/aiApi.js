import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import.meta.env; // Ensure Vite processes this import
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Define safety settings
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

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const Gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

var session = {
  sessionId: null,
  chatHistory: [],
};

const setSession = (sessionID, sessionArray) => {
  session.sessionId = sessionID;
  session.chatHistory = sessionArray.map((chat) => ({
    role: chat.role,
    parts: chat.parts,
  }));
};

//Functiob to generate chat title

const generateChatTitle = async (msg) => {
  const prompt = `Generate a chat title for a chat where the first message is: "${msg}". Provide only the title.`;
  const result = await Gemini.generateContent(prompt);
  const response = await result.response.text();
  return response;
};
// Function to remember user details in a session
const rememberMe = (username, nickname, about, tone, nature) => {
  const literrallyMe = `Hey Gemini,
Remember this
- My name is ${username}, but you can call me ${nickname}.
- A little about me: ${about}.
- When you're responding, please use a ${tone} tone.
- Also, keep in mind that I prefer interactions to be ${nature}.
Thanks!`;
  session.chatHistory.push({
    role: "user",
    parts: [
      {
        text: literrallyMe,
      },
    ],
  });
};

// Refactored chat function to be used in a front-end context
const chat = async (message) => {
  console.log("Session is ", session);
  try {
    const chatSession = await Gemini.startChat({
      history: session.chatHistory,
      generationConfig,
      safetySettings,
    });
    const msg = message;
    const result = await chatSession.sendMessage(msg);
    const text = await result.response.text();
    // Update chat history in the session
    session.chatHistory.push({ role: "user", parts: [{ text: msg }] });
    session.chatHistory.push({ role: "model", parts: [{ text: text }] });
    return { text };
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
      text: "An error occurred. Please refresh the page and try again.",
    };
  }
};

const translate = async (inputText, lang, customInstructions) => {
  try {
    const prompt = `Translate the text: "${inputText}" into ${lang} ${
      customInstructions ? "and " + customInstructions : ""
    }`;
    const result = await Gemini.generateContent(prompt);
    const response = await result.response.text();
    return response;
  } catch (error) {
    console.error(error);
    return "Translation error occurred. Please try again later.";
  }
};

const grammarCheck = async (inputText, customInstructions) => {
  try {
    const prompt = `Check the grammar of the following text and provide corrections if any: "${inputText}" \n \n ${
      customInstructions &&
      `answer according to the following instructions : ${customInstructions}`
    } `;
    const result = await Gemini.generateContent(prompt);
    const correctedText = await result.response.text();
    return correctedText;
  } catch (error) {
    console.error(error);
    return "Grammar check error occurred. Please try again later.";
  }
};

export {
  chat,
  translate,
  grammarCheck,
  rememberMe,
  setSession,
  generateChatTitle,
};
