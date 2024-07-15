import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addChatsHistory, currentChat } from "../Redux/Actions";
import TextMarkdown from "../components/TextMarkdown";
import { chat, setSession } from "../Api/aiApi";
import { ArrowUp, CircleNotch } from "@phosphor-icons/react";
import ChatHistory from "../components/ChatHistory";
import { CreateChatButton } from "../components/Buttons";

export default function ChatPage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const chatHistory = useSelector((state) => state.currentChat);
  const id = useSelector((state) => state.currentChatID);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const chatBoxRef = useRef(null);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    setSession(id, chatHistory);
  }, [chatHistory, id]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "15px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const userMessage = {
        role: "user",
        parts: [{ text: `${text} \n` }],
        timestamp: Date.now(),
      };
      setText("");
      dispatch(currentChat(id, userMessage));
      dispatch(addChatsHistory(id, userMessage));
      setIsLoading(true);

      const result = await chat(text);
      setIsLoading(false);
      const aiMessage = {
        role: "model",
        parts: [{ text: result.text }],
        timestamp: Date.now(),
      };
      dispatch(currentChat(id, aiMessage));
      dispatch(addChatsHistory(id, aiMessage));
      if (result.error) {
        console.error("Chat Error:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSidebarExpansion = () => {
    setSidebarOpen(!sidebarIsOpen);
  };

  return (
    <m.div
      key="chatPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`relative w-full h-screen pt-5 laptop:py-1 flex flex-col items-center ${
        isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
      }`}
    >
      <button
        onClick={handleSidebarExpansion}
        className="absolute top-5 left-5 bg-black p-2"
      >
        Expand Sidebar id is {id}
      </button>
      {sidebarIsOpen && <ChatHistory />}
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="scroll-smooth scrollbar-thumb-rounded overflow-scroll w-11/12 laptop:w-1/2 h-full mb-32 flex flex-col overflow-x-hidden overflow-y-auto px-2"
      >
        {chatHistory.length > 0 ? (
          chatHistory
            .slice(1)
            .map((message, index) => (
              <TextMarkdown
                key={index}
                keys={message.timestamp}
                role={message.role}
                plainText={message.parts[0].text}
              />
            ))
        ) : (
          <div className={`w-full  h-full  grid place-content-center  `}>
            <CreateChatButton />
          </div>
        )}
      </div>
      <div className="fixed bottom-16 smartphone:w-full w-1/3 flex justify-center items-center">
        <form
          onSubmit={handleSendMessage}
          className={`flex items-center justify-between p-2 ${
            text.length > 35 ? "rounded-3xl" : "rounded-full"
          } h-fit w-full mx-3 overflow-hidden transition-all ${
            isDarkMode
              ? "bg-foregroundLight/20 text-copy"
              : "bg-background/10 border-primary-dark text-copyLight"
          }`}
        >
          <textarea
            ref={textAreaRef}
            placeholder="Type your message..."
            className={`bg-transparent outline-none w-11/12 my-1 ml-4 pl-2 text-clip resize-none placeholder:pl-1 placeholder:py- overflow-y-auto ${
              isDarkMode
                ? "placeholder:text-copy caret-accent2"
                : "placeholder:text-copyLight caret-accent2lt"
            }`}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            value={text}
          />
          <button
            disabled={isLoading}
            type="submit"
            className={`${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            } w-11 h-10 grid place-content-center place-self-center bg-clip-border transition-colors ${
              isDarkMode
                ? "bg-foregroundLight hover:bg-foregroundLight/70 text-copyLight"
                : "bg-foregroundLight/50 hover:bg-foregroundLight/70 text-copyLight"
            } rounded-full`}
          >
            <m.span
              initial={isLoading ? { rotate: 0 } : { rotate: 0 }}
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: !isLoading ? 0.5 : 0.8,
                ease: "easeInOut",
                repeat: isLoading ? Infinity : 0,
              }}
            >
              {isLoading ? (
                <CircleNotch className="w-8 h-8" weight="bold" />
              ) : (
                <ArrowUp className="w-8 h-8" weight="bold" />
              )}
            </m.span>
          </button>
        </form>
      </div>
    </m.div>
  );
}
