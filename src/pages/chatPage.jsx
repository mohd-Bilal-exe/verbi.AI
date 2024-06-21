import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { currentChat } from "../Redux/Actions";
import TextMarkdown from "../components/TextMarkdown";
import { chat } from "../Api/aiApi";
import { ArrowUp, CircleNotch } from "@phosphor-icons/react";

export default function ChatPage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const chatHistory = useSelector((state) => state.currentChat);
  const password = useSelector((state) => state.userDetails.password);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + strMinutes + ampm;
  }
  const handleSendMessage = async (data) => {
    try {
      const userMessage = {
        role: "user",
        text: `${data.inputValue}.`,
        timestamp: formatTime(Date.now()),
      };
      dispatch(currentChat(password, userMessage));
      setIsLoading(true);
      const result = await chat(password, data.inputValue);
      setIsLoading(false);
      const aiMessage = {
        role: "model",
        text: result.text,
        timestamp: formatTime(Date.now()),
      };
      dispatch(currentChat(password, aiMessage));

      if (result.error) {
        console.error("Chat Error:", result.error);
      }

      reset();
      scrollToBottom();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      key="chatPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-full h-screen pt-5 laptop:py-4  flex flex-col items-center ${
        isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
      }`}
    >
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="w-11/12 h-full mb-32  flex flex-col overflow-y-auto"
      >
        {chatHistory &&
          chatHistory.map((message) => (
            <TextMarkdown
              key={message.chat.timestamp}
              keys={message.chat.timestamp}
              role={message.chat.role}
              plainText={message.chat.text}
            />
          ))}
      </div>

      <div className="flex  fixed h-14  bottom-16 justify-center item-center w-full laptop:max-w-lg px-3">
        <form
          onSubmit={handleSubmit(handleSendMessage)}
          className={`w-full h-full backdrop-blur flex rounded-full border p-2 ${
            isDarkMode
              ? "bg-foregroundLight/10 border-primary-light"
              : "bg-background/10 text-background"
          } `}
        >
          <input
            type="text"
            {...register("inputValue")}
            placeholder="Type your message..."
            className={` w-full h-full bg-transparent  rounded-full mx-1 outline-none ${
              isDarkMode
                ? "placeholder:text-copy-lighterLt placeholder:pl-2 pl-2 text-copy-light caret-secondary"
                : "placeholder:text-background placeholder:pl-2 pl-2 text-foreground caret-secondary"
            }`}
          />
          <button
            type="submit"
            className={`w-11 h-9.5 flex justify-center items-center p-1 rounded-full ${
              isDarkMode
                ? "bg-foregroundLight text-background "
                : "bg-foreground/60 text-copy"
            }`}
          >
            {!isLoading ? (
              <ArrowUp size={"95%"} weight="bold" />
            ) : (
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className={` `}
              >
                <CircleNotch size={"100%"} weight="duotone" />
              </motion.span>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
