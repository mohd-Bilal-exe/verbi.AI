/**
 * The grammarPage component allows users to input text and
 * check grammar of the text.
 */

import { useState, useMemo, useEffect } from "react";
import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import TextMarkdownTranslate from "../components/TextMarkdownTranslate";
import { getLanguagesWithFlags } from "../Api/langAPI";
import formatTime from "../utilities/dateString";
import { globalHistory } from "../Redux/Actions";
import { grammarCheck } from "../Api/aiApi";
import { DoButton } from "../components/Buttons";
const GrammarPage = () => {
  // Retrieves the dark mode state from the Redux store
  const isDarkMode = useSelector((state) => state.darkMode);

  // Stores the input text and the output text
  const [ipText, setIpText] = useState("");
  const [opText, setOpText] = useState("");

  // Stores the loading state and the custom instructions
  const [loading, setLoading] = useState(false);
  const [customInstructions, setCustomInstructions] = useState("");

  // Retrieves the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Formats the time using the formatTime function
  const formatTimefunc = (keys) => formatTime(keys);

  /**
   * Handles the grammar check by sending a request to the API and updating the state.
   */
  const handleGrammarCheck = async () => {
    setLoading(true);
    try {
      // Send a request to the grammar check API and retrieve the response
      const response = await grammarCheck(ipText, customInstructions);

      // Update the output text with the response
      setOpText(response);

      // Create an object with the input text, formatted time, and response
      const grammarObj = {
        ipText: ipText,
        time: formatTimefunc(Date.now()),
        opText: response,
      };

      // Dispatch an action to add the grammar check result to the Redux store
      dispatch(
        globalHistory({
          type: "Grammar Check",
          id: `${ipText}${Date.now()}`,
          values: grammarObj,
        })
      );
    } catch (error) {
      console.error("Error during grammar check:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  // Fetches the languages with flags when the component mounts
  useEffect(() => {
    getLanguagesWithFlags();
  }, []);

  // Memoizes the TextMarkdownTranslate component
  const MemoizedMarkdown = useMemo(
    () => <TextMarkdownTranslate plainText={opText} />,
    [opText]
  );

  return (
    <m.div
      key="GrammarPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen ${isDarkMode ? "text-copy" : "text-copyLight"
        }`}
    >
      <div
        className={`w-full h-full flex flex-col-reverse justify-end lg:justify-start items-start lg:flex-row gap-1 pt-16 smartphone:pt-5 px-3`}
      >
        <div
          className={`w-full flex flex-col border border-copy-lighter shadow-lg rounded-xl smartphone:h-1/3 h-3/4 overflow-hidden select-text`}
        >
          <textarea
            name="ipText"
            id="ipText"
            placeholder="Enter text for Grammar Check"
            value={ipText}
            onChange={(e) => setIpText(e.target.value)}
            className={`resize-none outline-none w-full h-full p-2 ${isDarkMode
              ? "bg-foreground/30 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
              } montserrat`}
          ></textarea>
          <input
            type="text"
            placeholder="Add your custom instructions"
            onChange={(e) => setCustomInstructions(e.target.value)}
            className={`w-full placeholder:pl-2 pl-2 border-t border-copy-lighter p-0.5 outline-none ${isDarkMode
              ? "bg-foreground/30 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
              } open-sans`}
          />
        </div>
        <div
          className={`w-1/6 h-3/4 smartphone:w-full smartphone:h-fit smartphone:py-4 ${isDarkMode ? "" : ""
            } h-1/6 flex flex-col smartphone:flex-row-reverse gap-4 items-center justify-center`}
        >
          <DoButton
            loading={loading}
            func={handleGrammarCheck}
            text="Check Now"
          />
        </div>

        <div
          className={`relative w-full h-3/4 smartphone:w-full smartphone:h-2/5`}
        >
          <m.div
            className={`w-full h-full scroll-smooth z-30 backdrop-blur border border-copy-lighter shadow-lg rounded-xl p-2  overflow-y-auto ${isDarkMode
              ? "bg-foreground/10 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
              } playfair scrollbar-thumb-rounded `}
          >
            {MemoizedMarkdown}
          </m.div>
        </div>
      </div>
    </m.div>
  );
};

export default GrammarPage;
