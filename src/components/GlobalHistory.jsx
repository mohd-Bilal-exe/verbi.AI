import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, m } from "framer-motion";
import TextMarkdownTranslate from "./TextMarkdownTranslate";
import { deleteHistory } from "../Redux/Actions";
import { ClearIcon, CollapseIcon } from "./SvgIcons";
import { Resize } from "@phosphor-icons/react";

export default function GlobalHistory() {
  const globalHistory = useSelector((state) => state.globalHistory);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Effect to monitor changes in globalHistory to determine animation necessity
  useEffect(() => {
    // Only set shouldAnimate to true if globalHistory has items and we are not already expanded
    if (globalHistory.length > 0 && !isExpanded) {
      setShouldAnimate(true);
    }
  }, [globalHistory, isExpanded]);

  // Handles the clear history functionality.
  const handleClearHistory = () => {
    // Dispatch the 'deleteHistory' action to clear the global history from the Redux store.
    dispatch(deleteHistory());
  };

  // Handles the click event for the expand button.
  const handleExpandClick = (state) => {
    // Set the isExpanded state to the provided state.
    setIsExpanded(state);
  };

  /**
   * Handles the click event for the expand button inside the div.
   * Updates the state of expandedItems with the given id.
   */
  const handleExpandClickDiv = (id) => {
    // Update the state of expandedItems with the given id.
    // If the id is already in the state object, toggle its value.
    // Otherwise, add the id to the state object with a value of true.
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: prevState[id] !== undefined ? !prevState[id] : true,
    }));
  };
  // Render the component
  return (
    <m.section
      key={"GlobalHistory"}
      initial={shouldAnimate ? { y: 200, opacity: 0 } : false}
      animate={
        isExpanded
          ? { y: 0, height: "90vh", width: "100%" }
          : { y: 0, height: "30vh", width: "90%" }
      }
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        type: "spring",
      }}
      className={` transform-gpu absolute backdrop-blur-lg   backdrop-brightness-50 ${isExpanded
        ? "bottom-0 pb-16 overflow-y-auto overflow-x-hidden rounded-t-3xl"
        : "-bottom-5 overflow-hidden smartphone:rounded-2xl rounded-t-2xl"
        } pt-3 border-t flex flex-col justify-start items-center gap-2 ${isDarkMode
          ? "bg-foregroundLight/10 border-copy/20"
          : "bg-foreground/30 border-copyLight/20"
        }`}
    >
      <div
        className={`w-full h-fit flex justify-between ${isDarkMode ? "text-white" : "text-copy"
          }`}
      >
        <button
          disabled={globalHistory.length === 0}
          onClick={handleClearHistory}
          className={`group w-fit h-8 flex justify-center items-center self-end ml-6 px-2 rounded-lg transition-all duration-300 ${isExpanded ? "bg-black/20" : ""
            } ${globalHistory.length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer hover:text-red-500"
            } text-sm open-sans`}
        >
          Clear History <ClearIcon />
        </button>
        <button
          disabled={globalHistory.length === 0 && !isExpanded}
          className={`group w-fit h-8 flex justify-center items-center self-end mr-4 px-2 rounded-lg open-sans ${globalHistory.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
            } ${isExpanded ? "bg-black/20" : ""} `}
          onClick={() => handleExpandClick(!isExpanded)}
        >
          {isExpanded ? (
            <>
              {"Collapse"}
              <CollapseIcon />
            </>
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
        className={`w-full flex gap-1 flex-col-reverse justify-start items-center ${isExpanded && "scrollbar-thumb-rounded overflow-y-auto"
          } `}
      >
        {globalHistory && globalHistory.length > 0 ? (
          globalHistory.map((history) => (
            <m.div
              key={`${history.id}-${history.type}`}
              className={`w-11/12 flex flex-col justify-start rounded-lg p-2 cursor-pointer ${isDarkMode ? "bg-foregroundLight/60" : "bg-foregroundLight/60"
                }`}
              onClick={() => {
                handleExpandClick(true);
                handleExpandClickDiv(history.id);
              }}
              initial={{ opacity: shouldAnimate ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className={`w-full text-2xl`}>
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
                {expandedItems[history.id] && (
                  <m.span
                    key={history.id}
                    className={`w-full flex flex-col`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <div key="input" className={`p-3`}>
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
                    <div key="output" className={`p-3`}>
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
                  </m.span>
                )}
              </AnimatePresence>
            </m.div>
          ))
        ) : (
          <p
            className={`text-lg lg:-mt-2  text-copy text-center smartphone:px-9 montserrat tracking-tight smartphone:my-auto`}
          >
            Looks like you haven&apos;t done anything yet.
          </p>
        )}
      </div>
    </m.section>
  );
}
