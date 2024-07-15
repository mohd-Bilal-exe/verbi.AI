import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat, setCurrentChatId } from "../Redux/Actions";
import { CreateChatButton } from "./Buttons";

export default function ChatHistory() {
  const currentChats = useSelector((state) => state.currentChat);
  const chats = useSelector((state) => state.chatHistory);
  const dispatch = useDispatch();

  const handleChatClick = (currentId) => {
    dispatch(setCurrentChat(currentId));
    dispatch(setCurrentChatId(currentId));
    console.log("id", currentId, "chats", currentChats);
  };

  return (
    <div className="absolute top-16 left-0 w-1/5 h-64 overflow-y-auto flex flex-col gap-2">
      <CreateChatButton />
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
