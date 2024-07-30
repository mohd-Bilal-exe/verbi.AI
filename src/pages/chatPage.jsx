import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addChatsHistory, addChatTitle, currentChat } from "../Redux/Actions";
import TextMarkdown from "../components/TextMarkdown";
import { chat, generateChatTitle, setSession } from "../Api/aiApi";
import { ArrowUp } from "@phosphor-icons/react";
import ChatHistory from "../components/ChatHistory";
import { CreateChatButton } from "../components/Buttons";
import { ExpandSidebarIcon, GeminiIcon } from "../components/SvgIcons";

export default function ChatPage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const Chat = useSelector((state) => state.currentChat);
  const id = useSelector((state) => state.currentChatID);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const [text, setText] = useState("");
  const [Error, setError] = useState("");
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
  }, [Chat]);

  useEffect(() => {
    setSession(id, Chat);
  }, [Chat, id]);

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
      if (!result.error) {
        dispatch(currentChat(id, aiMessage));
        dispatch(addChatsHistory(id, aiMessage));
      } else {
        console.log("from error boundry", result.error);
        setError(result.error);
      }
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

  const handleChatTitle = async () => {
    const title = await generateChatTitle(Chat[1].parts[0].text);
    dispatch(addChatTitle(id, title));
  };
  if (Chat.length == 2) {
    handleChatTitle();
  }
  return (
    <m.div
      key="chatPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`relative w-full h-screen pt-5 lg:py-1 flex flex-col items-center ${isDarkMode ? "bg-bg1/10 text-white" : "text-bg1"
        }`}
    >
      <button
        onClick={handleSidebarExpansion}
        className="absolute w-6 h-6 smartphone:size-7 top-3 left-3 backdrop-blur-lg "
      >
        <ExpandSidebarIcon />
      </button>
      <AnimatePresence>
        {sidebarIsOpen && (
          <>
            {" "}
            <ChatHistory setSidebarOpen={setSidebarOpen} />{" "}
            <m.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className={`transition duration-75 ease-linear absolute top-0 left-0 z-20 w-full h-full backdrop-brightness-50  `}
            >
              {" "}
            </m.div>
          </>
        )}
      </AnimatePresence>

      <div
        id="chatBox"
        ref={chatBoxRef}
        className="scroll-smooth scrollbar-thumb-rounded overflow-scroll w-11/12 lg:w-3/5 h-full mb-32 overflow-x-hidden overflow-y-auto px-2"
      >
        {Chat.length > 0 ? (
          Chat.slice(1).map((message, index) => (
            <div key={`container${index}`} className={`group flex flex-col`}>
              {message.role === "model" && <GeminiIcon />}

              <TextMarkdown
                key={index}
                keys={message.timestamp}
                role={message.role}
                plainText={message.parts[0].text}
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full grid place-content-center">
            <div className="flex flex-col justify-center items-center text-center tracking-tight text-sm">
              <h1 className={`text-6xl my-0.5`}>Welcome!</h1>
              <h1>Let&#39;s Start a New Conversation</h1>
              <h2>Click the button below</h2>
              <h2>and let&apos;s begin chatting.</h2>
              <div className="h-10 w-10 smartphone:size-16 my-4">
                {" "}
                <CreateChatButton />
              </div>
            </div>
          </div>
        )}
        {Error !== "" && (
          <p
            id="errorMSG"
            className={`w-fit place-self-center  border p-2 rounded-lg border-red-500 bg-red-500/10`}
          >
            {Error}
            <h1>Please refresh the page and try again.</h1>
          </p>
        )}
      </div>

      <div className="fixed bottom-16 z-10 smartphone:w-full w-1/3 flex justify-center items-center">
        <form
          onSubmit={handleSendMessage}
          className={`flex items-center justify-between p-2 ${Chat.length <= 0 && "opacity-0 "
            } ${text.length > 35 ? "rounded-3xl" : "rounded-full"
            } h-fit w-full mx-3 overflow-hidden transition-all border  ${isDarkMode
              ? "bg-foreground border-border  text-copy"
              : " bg-foregroundLight border-borderLight text-copyLight"
            }`}
        >
          <textarea
            ref={textAreaRef}
            placeholder="Type your message..."
            className={`bg-transparent outline-none w-11/12 my-1 ml-4 pl-2 text-clip resize-none placeholder:pl-1 placeholder:py- overflow-y-auto ${isDarkMode
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
            className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
              } w-11 h-10 grid place-content-center place-self-center bg-clip-border transition-colors border ${isDarkMode
                ? "bg-foregroundLight border-border  hover:bg-foregroundLight/70 text-copyLight"
                : "bg-foreground/20 border-border hover:bg-foregroundLight/70 text-copyLight"
              } rounded-full`}
          >
            <m.span
              initial={isLoading ? { rotate: 0 } : { rotate: 0 }}
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: !isLoading ? 0.5 : 0.8,
                ease: "easeIn",
                repeat: isLoading ? Infinity : 0,
              }}
            >
              {isLoading ? (
                <GeminiIcon className="w-8 h-8" weight="bold" />
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
