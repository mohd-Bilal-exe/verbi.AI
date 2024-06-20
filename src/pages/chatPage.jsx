import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { currentChat } from "../Redux/Actions";
import TextMarkdown from "../components/TextMarkdown";
import { chat } from "../Api/aiApi";
import { ArrowUp } from "@phosphor-icons/react";

export default function ChatPage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const chatHistory = useSelector((state) => state.currentChat);
  const password = useSelector((state) => state.userDetails.password);
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
console.log()
  const handleSendMessage = async (data) => {
    try {
      const userMessage = {
        role: "user",
        text: data.inputValue,
        timestamp: Date.now(),
      };
      dispatch(currentChat(password, userMessage));

      const result = await chat(password, data.inputValue);

      const aiMessage = {
        role: "model",
        text: result.text,
        timestamp: Date.now(),
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
      className={`w-full h-screen pt-5 laptop:py-4 smartphone:-mb-2 flex flex-col items-center ${
        isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
      }`}
    >
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="w-11/12 h-4/5 flex flex-col overflow-y-auto"
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

      <div className="flex justify-center item-center w-full laptop:max-w-lg px-3">
        <form onSubmit={handleSubmit(handleSendMessage)} className={`w-full h-full flex rounded-full p-2 ${isDarkMode ? "bg-lightBg2/10 text-bg2" : "bg-bg3/10"} `}>
            <input
              type="text"
              {...register("inputValue")}
              placeholder="Type your message..."
              className={` w-full h-full bg-transparent rounded-full mx-1 outline-none ${isDarkMode ? "placeholder:text-lightBg1 placeholder:pl-2 pl-2 text-lightBg1 caret-DarkAccentBluedk" : "placeholder:text-bg2 placeholder:pl-2 text-g1 caret-LightAccentBluedk"}`}
            />
            <button
              type="submit"
              className={`w-10 h-9.5 flex justify-center items-center p-1 rounded-full ${isDarkMode ? "bg-lightBg1 text-bg2" : "bg-bg3/20"}`}
            >
              <ArrowUp size={"100%"} weight="bold" />
            </button>
        </form>
      </div>
    </motion.div>
  );
}
