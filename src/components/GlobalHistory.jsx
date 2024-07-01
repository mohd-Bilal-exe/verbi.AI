import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TextMarkdownTranslate from "./TextMarkdownTranslate";
import { deleteHistory } from "../Redux/Actions";
import { ClearIcon, ExpandIcon } from "./SvgIcons";
import { Broom, Resize } from "@phosphor-icons/react";

export default function GlobalHistory() {
  const globalHistory = useSelector((state) => state.globalHistory);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(globalHistory);
  const handleClearHistory = () => {
    dispatch(deleteHistory());
  };
  const handleExpandClick = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const handleExpandClickDiv = (id) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <motion.section
      transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
      layout
      className={` backdrop-blur-lg   ${
        isExpanded
          ? "w-full h-4/5 absolute bottom-0 left-0 pb-16 overflow-y-auto overflow-x-hidden rounded-t-3xl backdrop-brightness-50"
          : "w-11/12 h-2/5 overflow-hidden rounded-t-2xl "
      }  py-5 border-t flex flex-col justify-start items-center gap-2 ${
        isDarkMode
          ? "bg-foregroundLight/10 border-copy/20"
          : "bg-foreground/30 border-copyLight/20"
      }`}
    >
      <div className={`w-full flex justify-between`}>
        {" "}
        <button
          onClick={handleClearHistory}
          className={`group w-fit h-8 flex justify-center items-center self-end ml-4 mb-2 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Clear History <ClearIcon />
        </button>
        <button
          className={`group w-fit h-8 flex justify-center items-center self-end mr-4 mb-2 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          onClick={handleExpandClick}
        >
          {isExpanded ? (
            "Collapse"
          ) : (
            <>
              {"Expand "}
              <Resize
                className={`group-hover:scale-110 mx-1 group-hover:text-blue-500 transition-all duration-300`}
                size={20}
                weight="duotone"
              />
            </>
          )}
        </button>
      </div>
      <div
        className={`w-full flex gap-2 flex-col-reverse justify-start items-center`}
      >
        {globalHistory && globalHistory.length > 0 ? (
          globalHistory.map((history) => (
            <motion.div
              key={history.id}
              className={`w-11/12 flex flex-col justify-start rounded-lg p-2 cursor-pointer ${
                isDarkMode ? "bg-foregroundLight/60" : "bg-foregroundLight/60"
              }`}
              onClick={() => handleExpandClickDiv(history.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className={`w-full  text-2xl`}>
                {history.type}
                {history.values.translatedTo && (
                  <span className={`mx-3 text-sm`}>
                    Translated to - {history.values.translatedTo}
                  </span>
                )}
                {history.type === "Grammar Check" && (
                  <span className={`mx-3 text-sm`}>
                    Checked grammar of the sentence - {history.values.ipText}
                  </span>
                )}
              </span>
              <AnimatePresence>
                {isExpanded[history.id] && (
                  <motion.span
                    className={`w-full flex flex-col`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div key="input" className={` p-3`}>
                      {history.type === "Translation" ? (
                        <>
                          <span className={`my-1 font-semibold`}>
                            Your Text-{" "}
                          </span>{" "}
                          {history.values.translationObj.ipText}
                        </>
                      ) : (
                        history.values.ipText
                      )}
                    </div>
                    <div key="output" className={` p-3`}>
                      {history.type === "Translation" ? (
                        <>
                          <span className={`my-1 font-semibold`}>
                            The Translation-{" "}
                          </span>
                          <TextMarkdownTranslate
                            plainText={history.values.translationObj.opText}
                            history={true}
                          />{" "}
                        </>
                      ) : (
                        <>
                          <span className={`my-1 font-semibold`}>
                            The Response-{" "}
                          </span>
                          <TextMarkdownTranslate
                            plainText={history.values.opText}
                            history={true}
                          />{" "}
                        </>
                      )}
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <p
            className={`text-lg ${isDarkMode ? "text-copy" : "text-copyLight"}`}
          >
            No history available
          </p>
        )}
      </div>
    </motion.section>
  );
}
