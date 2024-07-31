import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  setCurrentChat,
  setCurrentChatId,
} from "../Redux/Actions";
import { CreateChatButton } from "./Buttons";
import { AnimatePresence, m } from "framer-motion";
import { DeleteIcon, ExpandSidebarIcon } from "./SvgIcons";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const container = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      ease: "easeInOut"
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
  const [deleteModalopen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const isDarkMode = useSelector((state) => state.darkMode);
  const chats = useSelector((state) => state.chatHistory);
  const selectedID = useSelector((state) => state.currentChatID);
  const dispatch = useDispatch();

  const handleChatDelete = (currentId) => {
    setDeleteId(currentId);
    setDeleteModalOpen(true);
  };

  const handleChatClick = (currentId) => {
    dispatch(setCurrentChat(currentId));
    dispatch(setCurrentChatId(currentId));
    setSidebarOpen(false);
  };
  return (
    <>
      <AnimatePresence>
        {deleteModalopen && <DeleteModal setDeleteModalOpen={setDeleteModalOpen} deleteId={deleteId} setSidebarOpen={setSidebarOpen} />}
      </AnimatePresence>
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ x: -50, opacity: 0 }}
        className="transition duration-75 ease-linear absolute top-0 z-30 left-0 w-1/5 smartphone:w-3/5 h-full pb-24  overflow-y-auto flex flex-col items-center  gap-2 backdrop-blur-lg backdrop-brightness-75"
      >
        <m.div
          className={`w-full h-fit  p-3 mb-3 flex justify-between ${isDarkMode ? "bg-backgroundLight/10" : "bg-background/20"
            }`}
        >
          <button
            className={`size-7 rounded-lg rotate-180  ${isDarkMode ? "text-copy" : "text-copy-light"
              } `}
            onClick={() => setSidebarOpen(false)}
          >
            <ExpandSidebarIcon />
          </button>
          <div className={`size-7`}>
            <CreateChatButton setSidebarOpen={setSidebarOpen} />
          </div>
        </m.div>
        <span className={`text-lg mb-3 text-copy`}>All Chats</span>
        {Object.keys(chats).length === 0 ? (
          <span
            className={`${isDarkMode ? " text-copy" : " text-copyLight"
              } mx-4 flex flex-col text-sm  `}
          >
            <span className={`text-2xl my-1 `}>Oops! </span> It looks like
            you have&apos;nt started chatting yet.
          </span>
        ) : (
          Object.entries(chats).map(([sessionId, chat]) => (
            <m.span
              variants={item}
              key={sessionId}
              className={`relative w-11/12 h-fit max-h-24 overflow-clip  p-2 py-2   rounded-xl text-xs  font-semibold flex text-copy  ${sessionId === selectedID &&
                (isDarkMode
                  ? "bg-backgroundLight/80 text-copyLight"
                  : "bg-background/80 text-copy")
                }`}
            >
              <span
                className={`cursor-pointer h-full w-full `}
                onClick={() => handleChatClick(sessionId)}
              >
                {chat.title}{" "}
              </span>

              <div
                className={`absolute right-0 top-0 z-30 flex justify-end  bg-gradient-to-l ${sessionId === selectedID &&
                  (isDarkMode
                    ? "from-backgroundLight text-copyLight"
                    : "from-background text-copy")
                  }  h-full w-20`}
              >
                {sessionId === selectedID && (
                  <button
                    onClick={() => handleChatDelete(sessionId)}
                    className={`size-5 my-auto mr-1 text-red-600`}
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </m.span>
          ))
        )}
      </m.div></>
  );
}
ChatHistory.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};
