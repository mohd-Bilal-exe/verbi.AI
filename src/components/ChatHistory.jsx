import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteCurrentChat,
  setCurrentChat,
  setCurrentChatId,
} from "../Redux/Actions";
import { CreateChatButton } from "./Buttons";
import { m } from "framer-motion";
import { DeleteIcon, ExpandSidebarIcon } from "./SvgIcons";

const container = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
export default function ChatHistory({ setSidebarOpen }) {
  const isDarkMode = useSelector((state) => state.darkMode);
  const chats = useSelector((state) => state.chatHistory);
  const selectedID = useSelector((state) => state.currentChatID);
  const dispatch = useDispatch();

  const handleChatDelete = (currentId) => {
    console.log();
    dispatch(deleteCurrentChat(currentId));
  };

  const handleChatClick = (currentId) => {
    dispatch(setCurrentChat(currentId));
    dispatch(setCurrentChatId(currentId));
    setSidebarOpen(false);
  };
  return (
    <m.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
      className="absolute top-0 left-0 w-1/5 smartphone:w-3/5 h-full pb-24  overflow-y-auto flex flex-col items-center  gap-2 backdrop-blur-xl backdrop-brightness-75 z-20"
    >
      <m.div
        className={`w-full h-fit  p-2 flex justify-between ${
          isDarkMode ? "bg-backgroundLight/10" : "bg-background/20"
        }`}
      >
        <button
          className={`w-6 h-6 smartphone:size-8 rounded-lg rotate-180  ${
            isDarkMode ? "text-copy" : "text-copyLight"
          } `}
          onClick={() => setSidebarOpen(false)}
        >
          <ExpandSidebarIcon />
        </button>
        <div className={`w-6 h-6 smartphone:size-8`}>
          <CreateChatButton setSidebarOpen={setSidebarOpen} />
        </div>
      </m.div>

      {Object.keys(chats).length === 0 ? (
        <span
          className={`${
            isDarkMode ? "text-copy" : "text-copyLight "
          } mx-4 flex flex-col text-sm `}
        >
          <span className={`text-2xl my-1 `}>Oops! </span> It looks like
          there&apos;s no chat history available.
        </span>
      ) : (
        Object.entries(chats).map(([sessionId, chat]) => (
          <m.span
            variants={item}
            key={sessionId}
            className={`relative w-11/12 h-fit max-h-14 overflow-clip  p-2  rounded-xl text-sm font-semibold flex ${
              sessionId === selectedID
                ? "bg-backgroundLight/80 text-copyLight"
                : ""
            }`}
          >
            <span
              className={`cursor-pointer`}
              onClick={() => handleChatClick(sessionId)}
            >
              {chat.title}{" "}
            </span>

            <div
              className={`absolute right-0 top-0 z-30 flex justify-end  bg-gradient-to-l ${
                sessionId === selectedID ? "from-backgroundLight/80 " : ""
              }  h-full w-16`}
            >
              {sessionId === selectedID && (
                <button
                  onClick={() => handleChatDelete(sessionId)}
                  className={`w-4 h-4 my-auto mr-1 text-red-800`}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          </m.span>
        ))
      )}
    </m.div>
  );
}
ChatHistory.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};
