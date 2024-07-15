import { useDispatch, useSelector } from "react-redux";
import {
  addChatsHistory,
  createNewChat,
  currentChat,
  deleteChatHistory,
  setCurrentChatId,
} from "../Redux/Actions";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { CircleNotch } from "@phosphor-icons/react";
import { m } from "framer-motion";

export const CreateChatButton = () => {
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

  return (
    <button
      onClick={handleCreateChat}
      className="mb-2 p-2 bg-green-500 text-white"
    >
      New chat
    </button>
  );
};

export const DoButton = ({ loading, func, text }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  return (
    <button
      onClick={func}
      className={`w-28 h-10 text-sm rounded-xl flex flex-col items-center justify-center gap-2 }text-copyLight ${
        loading ? `cursor-not-allowed bg-gradient-to-tr  ` : ` cursor-pointer`
      } ${
        isDarkMode
          ? "bg-backgroundLight/10 from-geminiPrimary to-geminiSecondary "
          : "bg-background/90 from-geminiPrimarylt to-geminiSecondarylt "
      } text-copyLight overflow-hidden transition-colors duration-700 delay-1000`}
      disabled={loading}
      aria-label="Check Grammar Now"
    >
      <m.span
        key="spinnerCont"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: loading ? 21 : -22, opacity: 1 }}
        transition={{
          duration: 0.7,
          type: "spring",
          ease: "easeInOut",
        }}
        className="w-full h-fit flex flex-col items-center"
      >
        <span className={`my-2.5 flex justify-center items-center w-6 h-6`}>
          {loading && (
            <m.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                type: "spring",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className=""
            >
              <CircleNotch className="w-6 h-6" weight="bold" />
            </m.span>
          )}
        </span>
        <span
          className={`py-2.5  font-semibold tracking-wider montserrat bg-gradient-to-tr  ${
            isDarkMode
              ? "from-geminiPrimary to-geminiSecondary"
              : "from-geminiPrimarylt to-geminiSecondarylt"
          } text-transparent bg-clip-text`}
        >
          {` ${text} `}
        </span>
      </m.span>
    </button>
  );
};

DoButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};