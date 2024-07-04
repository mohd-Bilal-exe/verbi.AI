import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { currentChat } from "../Redux/Actions";
import TextMarkdown from "../components/TextMarkdown";
import { chat } from "../Api/aiApi";
import { ArrowUp, CircleNotch } from "@phosphor-icons/react";

export default function ChatPage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const chatHistory = useSelector((state) => state.currentChat);
  const id = useSelector((state) => state.userDetails.id);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);
  //const [currentSesh, setCurrentSesh] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight - 500;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "15px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const userMessage = {
        role: "user",
        text: `${text} \n`,
        timestamp: Date.now(),
      };

      //setCurrentSesh((prevSesh) => [...prevSesh, userMessage]);
      dispatch(currentChat(id, userMessage));
      setIsLoading(true);

      const result = await chat(id, text);
      setIsLoading(false);
      const aiMessage = {
        role: "model",
        text: result.text,
        timestamp: Date.now(),
      };
      //setCurrentSesh((prevSesh) => [...prevSesh, aiMessage]);
      dispatch(currentChat(id, aiMessage));

      if (result.error) {
        console.error("Chat Error:", result.error);
      }
      setText(""); // Clear the input field after sending message
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  return (
    <m.div
      key="chatPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-full h-screen pt-5 laptop:py-1 flex flex-col items-center ${
        isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
      }`}
    >
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="scroll-smooth overflow-scroll w-11/12 laptop:w-1/2 h-full mb-32 flex flex-col overflow-x-hidden overflow-y-auto px-2"
      >
        {chatHistory &&
          chatHistory.map((message, index) => (
            <TextMarkdown
              key={index}
              keys={message.chat.timestamp}
              role={message.chat.role}
              plainText={message.chat.text}
            />
          ))}
      </div>
      <div className="fixed bottom-16 smartphone:w-full w-1/3 flex justify-center items-center">
        <form
          onSubmit={handleSendMessage}
          className={`flex items-center justify-between p-2 rounded-full h-fit w-full mx-3 overflow-hidden ${
            isDarkMode
              ? "bg-foregroundLight/10 border-primary-light"
              : "bg-background/10 border-primary-dark text-background"
          }`}
        >
          <textarea
            ref={textAreaRef}
            placeholder="Type your message..."
            className={`bg-transparent outline-none w-11/12 my-1 ml-4 pl-2 text-clip resize-none placeholder:pl-1 placeholder:py- overflow-y-auto ${
              isDarkMode
                ? "placeholder:text-copy-lighter text-copy-light caret-secondary"
                : "placeholder:text-copyLight text-foreground caret-secondary"
            }`}
            onChange={handleTextChange}
            value={text}
          />
          <button
            disabled={isLoading}
            type="submit"
            className={` ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }  w-11 h-10 grid place-content-center place-self-center transition-colors ${
              isDarkMode
                ? "bg-foregroundLight hover:bg-foregroundLight/70  text-copyLight"
                : "bg-foreground/60 hover:bg-foreground/70 text-copy"
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
