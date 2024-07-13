import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addChatsHistory,
  createNewChat,
  currentChat,
  deleteChatHistory,
  setCurrentChat,
  setCurrentChatId,
} from "../Redux/Actions";

export default function ChatHistory() {
  const currentChats = useSelector((state) => state.currentChat);
  const chats = useSelector((state) => state.chatHistory);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const handleCreateChat = () => {
    const id = uuidv4();
    const rememberMeMessage = `Hey Gemini,
      Remember this
    - My name is ${userDetails.username}, but you can call me ${userDetails.nickname}.
    - A little about me: ${userDetails.about}.
    - When you're responding, please use a ${userDetails.tone} tone.
    - Also, keep in mind that I prefer interactions to be ${userDetails.nature}.
    Thanks!`;
    dispatch(createNewChat(id));
    dispatch(setCurrentChatId(id));
    dispatch(deleteChatHistory());
    const userMessage = {
      role: "user",
      parts: [{ text: rememberMeMessage }],
      timestamp: Date.now(),
    };
    dispatch(currentChat(id, userMessage));
    dispatch(addChatsHistory(id, userMessage));
  };

  const handleChatClick = (currentId) => {
    dispatch(setCurrentChat(currentId));
    dispatch(setCurrentChatId(currentId));
    console.log("id", currentId, "chats", currentChats);
  };

  return (
    <div className="absolute top-16 left-0 w-1/5 h-64 overflow-y-auto flex flex-col gap-2">
      <button
        onClick={handleCreateChat}
        className="mb-2 p-2 bg-green-500 text-white"
      >
        New chat
      </button>
      {Object.keys(chats).length === 0 ? (
        <span className="text-gray-500">No chat history available.</span>
      ) : (
        Object.entries(chats).map(([sessionId]) => (
          <span
            key={sessionId}
            onClick={() => handleChatClick(sessionId)}
            className="w-fit bg-blue-400 p-2 cursor-pointer"
          >
            Session is {sessionId}
          </span>
        ))
      )}
    </div>
  );
}
