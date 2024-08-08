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

// CreateChatButton component that displays a button to create a new chat.
export const CreateChatButton = ({ setSidebarOpen }) => {
  // Get the dark mode state from the Redux store
  const isDarkMode = useSelector((state) => state.darkMode);
  // Get the user details from the Redux store
  const userDetails = useSelector((state) => state.userDetails);
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Handle create chat button click
  const handleCreateChat = () => {
    // Generate a unique id for the chat
    const id = uuidv4();
    // Generate a remember me message for the chat
    const rememberMeMessage = `Hey Gemini,
      Remember this
    - My name is ${userDetails.username}, but you can call me ${userDetails.nickname}.
    - A little about me: ${userDetails.about}.
    - When you're responding, please use a ${userDetails.Tone} tone.
    - Also, keep in mind that I prefer interactions to be ${userDetails.Nature}.
    Thanks!`;
    // Dispatch actions to create a new chat, set the current chat id, and delete the current chat history
    dispatch(createNewChat(id));
    dispatch(setCurrentChatId(id));
    dispatch(deleteCurrentchatHistory());
    // Create a user message object with the remember me message and current timestamp
    const userMessage = {
      role: "user",
      parts: [{ text: rememberMeMessage }],
      timestamp: Date.now(),
    };
    // Dispatch actions to set the current chat, add a chat title, add chat history, and set the sidebar open state to false
    dispatch(currentChat(id, userMessage));
    dispatch(addChatTitle(id, "New Chat"));
    dispatch(addChatsHistory(id, userMessage));
    setSidebarOpen(false);
  };

  return (
    // Render a button element with the onClick event handler and className
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
/**
 * A button component with a loading state and a callback function.
 */
export const DoButton = ({ loading, func, text }) => {
  const isDarkMode = useSelector((state) => state.darkMode); // Get the dark mode state from the Redux store
  // Render the button component
  return (
    <button
      onClick={func} // Attach the callback function to the onClick event
      className={`w-28 h-10 text-sm rounded-xl flex flex-col items-center justify-center gap-2 }text-copyLight ${loading ? `cursor-not-allowed bg-gradient-to-tr  ` : ` cursor-pointer`
        } ${isDarkMode ? "bg-backgroundLight/10  " : "bg-background/90  "
        } text-copyLight overflow-hidden transition-colors duration-700 delay-1000`}
      disabled={loading} // Disable the button if it is in a loading state
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
