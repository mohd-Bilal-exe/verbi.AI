import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyA3kJyE6wCBi7mf81rKxhwROlo-Q5HCEgU");
const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 50,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const Gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sessions = {};

// Function to remember user details in a session
const rememberMe = (sessionId, username, nickname, about, tone, nature) => {
  if (!sessions[sessionId]) {
    sessions[sessionId] = { history: [] };
  }

  console.log("session is ", sessionId);

  sessions[sessionId].userDetails = { username, nickname, about, tone, nature };

  const literrallyMe = `Remember that my name is ${username}, 
  but you should address me as ${nickname}. 
  Here is a bit about me: ${about}. 
  When responding to me, make sure to use a ${tone} tone. 
  Additionally, keep in mind that I prefer to be interacted with a ${nature} manner.`;
  console.log(tone);
  console.log(nature);
  console.log(literrallyMe);
  sessions[sessionId].history.push({
    role: "user",
    parts: [
      {
        text: literrallyMe,
      },
    ],
  });
};

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
    console.log(sessions);
    let chatHistory = sessions[sessionId].history;
    const chatSession = await Gemini.startChat({
      history: chatHistory,
      generationConfig,
    });

    const msg = message || "Hi"; // Default message if none provided
    const result = await chatSession.sendMessage(msg);
    const text = await result.response.text();

    // Update chat history in the session
    chatHistory.push({ role: "user", parts: [{ text: msg }] });
    chatHistory.push({ role: "model", parts: [{ text }] });
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

export { chat, translate, grammarCheck, rememberMe };
