import { useDispatch, useSelector } from "react-redux";
import {
  addChatsHistory,
  addChatTitle,
  createNewChat,
  currentChat,
  deleteCurrentchatHistory,
  setCurrentChatId,
} from "../Redux/Actions";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { m } from "framer-motion";
import { AddIcon, GeminiIcon } from "./SvgIcons";

export const CreateChatButton = ({ setSidebarOpen }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const handleCreateChat = () => {
    const id = uuidv4();
    const rememberMeMessage = `Hey Gemini,
      Remember this
    - My name is ${userDetails.username}, but you can call me ${userDetails.nickname}.
    - A little about me: ${userDetails.about}.
    - When you're responding, please use a ${userDetails.Tone} tone.
    - Also, keep in mind that I prefer interactions to be ${userDetails.Nature}.
    Thanks!`;
    dispatch(createNewChat(id));
    dispatch(setCurrentChatId(id));
    dispatch(deleteCurrentchatHistory());
    const userMessage = {
      role: "user",
      parts: [{ text: rememberMeMessage }],
      timestamp: Date.now(),
    };
    dispatch(currentChat(id, userMessage));
    dispatch(addChatTitle(id, "New Chat"));
    dispatch(addChatsHistory(id, userMessage));
    setSidebarOpen(false);
  };

  return (
    <button
      onClick={handleCreateChat}
      className={`w-full h-full flex justify-center items-center  rounded-full bg-gradient-to-tr group transition-all   ${isDarkMode
          ? " from-geminiPrimary to-geminiSecondary text-copyLight "
          : " from-geminiPrimarylt to-geminiSecondarylt text-copyLight "
        } `}
    >
      <AddIcon />
    </button>
  );
};
CreateChatButton.propTypes = {
  setSidebarOpen: PropTypes.func,
};
export const DoButton = ({ loading, func, text }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  return (
    <button
      onClick={func}
      className={`w-28 h-10 text-sm rounded-xl flex flex-col items-center justify-center gap-2 }text-copyLight ${loading ? `cursor-not-allowed bg-gradient-to-tr  ` : ` cursor-pointer`
        } ${isDarkMode ? "bg-backgroundLight/10  " : "bg-background/90  "
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
              <GeminiIcon />
            </m.span>
          )}
        </span>
        <span
          className={`py-2.5  font-semibold tracking-wider montserrat bg-gradient-to-tr  ${isDarkMode
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
