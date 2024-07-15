import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentChat, setCurrentChatId } from "../Redux/Actions";
import { CreateChatButton } from "./Buttons";
import { m } from "framer-motion";
import { ExpandSidebarIcon } from "./SvgIcons";

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
  const chats = useSelector((state) => state.chatHistory);
  const selectedID = useSelector((state) => state.currentChatID);
  const dispatch = useDispatch();

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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute border-r top-0 left-0 w-1/5 h-full pb-24  p-1 overflow-y-auto flex flex-col items-center  gap-2"
    >
      <m.div className={`w-full h-fit  p-2 flex justify-between`}>
        <button className={`w-6 h-6`} onClick={() => setSidebarOpen(false)}>
          <ExpandSidebarIcon />
        </button>
        <div className={`w-6 h-6`}>
          <CreateChatButton />
        </div>
      </m.div>

      {Object.keys(chats).length === 0 ? (
        <span className="text-gray-500">No chat history available.</span>
      ) : (
        Object.entries(chats).map(([sessionId, chat]) => (
          <m.span
            variants={item}
            key={sessionId}
            onClick={() => handleChatClick(sessionId)}
            className={`w-10/12 h-fit max-h-14 overflow-clip  p-2 cursor-pointer rounded-xl text-sm font-semibold ${
              sessionId === selectedID
                ? "bg-backgroundLight/80 text-copyLight"
                : ""
            }`}
          >
            {chat.title}
          </m.span>
        ))
      )}
    </m.div>
  );
}
ChatHistory.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};
