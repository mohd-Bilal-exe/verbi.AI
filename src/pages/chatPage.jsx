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
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
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

  const handleSendMessage = async (data) => {
    try {
      const userMessage = {
        role: "user",
        text: `${data.inputValue} \n`,
        timestamp: Date.now(),
      };
      dispatch(currentChat(password, userMessage));
      setText("");
      setIsLoading(true);
      const result = await chat(password, data.inputValue);
      setIsLoading(false);
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
      className={`w-full h-screen pt-5 laptop:py-4  flex flex-col items-center ${
        isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
      }`}
    >
      <div
        id="chatBox"
        ref={chatBoxRef}
        className="w-11/12 laptop:w-1/2  h-full mb-32  flex flex-col overflow-y-auto"
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

      <div className="flex  fixed  h-fit  bottom-16 justify-center item-center w-full laptop:max-w-lg px-3">
        <form
          onSubmit={handleSubmit(handleSendMessage)}
          className={`w-full h-fit backdrop-blur flex items-center ${
            text.length > 20 ? "rounded-2xl" : "rounded-full"
          } border p-2 ${
            isDarkMode
              ? "bg-foregroundLight/10 border-primary-light"
              : "bg-background/10 border-primary-dark text-background"
          } `}
        >
          <textarea
            type="text"
            {...register("inputValue")}
            placeholder="Type your message..."
            className={`resize-none w-full ${
              text.length > 20 ? "h-fit" : "h-8"
            } bg-transparent  placeholder:py- placeholder:pl-1  pl-2 pr-1 mx-1 outline-none flex items-center justify-start ${
              isDarkMode
                ? "placeholder:text-copy-lighter text-copy-light caret-secondary"
                : "placeholder:text-copyLight text-foreground caret-secondary"
            }`}
            onChange={handleTextChange}
          />

          <button
            type="submit"
            className={`w-8 h-8 flex justify-center items-center p-1 rounded-full ${
              isDarkMode
                ? "bg-foregroundLight text-copyLight "
                : "bg-foreground/60 text-copy"
            }`}
          >
            <>
              {!isLoading ? (
                <motion.span
                  key="arrow"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={` w-10 h-10 grid place-content-center`}
                >
                  <ArrowUp size={"95%"} weight="bold" />
                </motion.span>
              ) : (
                <motion.span
                  key="circle"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  exit={{ rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`w-10 h-10 grid place-content-center `}
                >
                  <CircleNotch size={"100%"} weight="duotone" />
                </motion.span>
              )}
            </>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
