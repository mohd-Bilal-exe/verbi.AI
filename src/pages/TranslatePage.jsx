/**
 * The TranslatePage component allows users to input text and
 * translates it to the selected language.
 */
import { useState, useMemo, useEffect } from "react";
import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { translate } from "../Api/aiApi";
import TextMarkdownTranslate from "../components/TextMarkdownTranslate";
import { getLanguagesWithFlags } from "../Api/langAPI";
import formatTime from "../utilities/dateString";
import { addTranslations, globalHistory } from "../Redux/Actions";
import { DoButton } from "../components/Buttons";
import { LangDropDown } from "../components/Dropdowns";


const TranslatePage = () => {
  // Retrieve the dark mode state from the Redux store
  const isDarkMode = useSelector((state) => state.darkMode);

  // Store the input text and the output text
  const [ipText, setIpText] = useState("");
  const [opText, setOpText] = useState("");

  // Store the loading state and the custom instructions
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [customInstructions, setCustomInstructions] = useState("");

  // Retrieve the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Formats the time using the formatTime function
  const formatTimefunc = (keys) => formatTime(keys);

  /**
   * Handles the translation by sending a request to the API and updating the state.
   */
  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await translate(
        ipText,
        selectedLang,
        customInstructions
      );
      setOpText(response);
      const translationObj = {
        ipText: ipText,
        time: formatTimefunc(Date.now()),
        opText: response,
      };
      dispatch(addTranslations(translationObj));
      dispatch(
        globalHistory({
          type: "Translation",
          id: `${ipText}${Date.now()}`,
          values: {
            translatedTo: selectedLang,
            translationObj,
          },
        })
      );
    } catch (error) {
      console.error("Error during translation:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  // Fetch the languages with flags when the component mounts
  useEffect(() => {
    getLanguagesWithFlags();
  }, []);

  // Memoize the TextMarkdownTranslate component to avoid unnecessary re-renders
  const MemoizedMarkdown = useMemo(
    () => <TextMarkdownTranslate plainText={opText} />,
    [opText]
  );

  return (
    <m.div
      key="TranslatePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen ${isDarkMode ? "text-copy" : "text-copyLight"
        }`}
    >
      <div
        className={`w-full h-full flex flex-col-reverse justify-start smartphone:justify-end  items-start lg:flex-row lg:px-10 gap-1 pt-16 smartphone:pt-5  px-3`}
      >
        {/* Input text area */}
        <div
          className={`w-full flex flex-col border border-copy-lighter shadow-lg  rounded-xl smartphone:h-1/3 h-3/4 overflow-hidden`}
        >
          <textarea
            name="ipText"
            id="ipText"
            placeholder="Enter text to Translate"
            value={ipText}
            onChange={(e) => setIpText(e.target.value)}
            className={`resize-none outline-none w-full h-full p-2 ${isDarkMode
              ? "bg-foreground/30 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
              } `}
          ></textarea>
          <input
            type="text"
            placeholder="Add your custom instructions"
            onChange={(e) => setCustomInstructions(e.target.value)}
            className={`w-full placeholder:pl-2 pl-2  border-t border-copy-lighter p-0.5 outline-none ${isDarkMode
              ? "bg-foreground/30 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
              }`}
          />
        </div>
        {/* Translation controls */}
        <div
          className={`w-1/6 h-3/4 smartphone:w-full smartphone:h-fit smartphone:py-4  ${isDarkMode ? "" : ""
            } h-1/6  flex flex-col smartphone:flex-row-reverse  gap-4 items-center justify-center`}
        >
          <DoButton loading={loading} func={handleTranslate} text="Translate" />
          <LangDropDown
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            isDropdownOpenn={!loading}
          />
        </div>
        {/* Translated text area */}
        <div
          className={`w-full  smartphone:w-full smartphone:h-2/5  scroll-smooth  border border-copy-lighter shadow-lg  rounded-xl p-2 overflow-y-auto  ${isDarkMode
            ? "bg-foreground/30 placeholder:text-copy-light"
            : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
            } border h-3/4 scrollbar-thumb-rounded`}
        >
          {MemoizedMarkdown}
        </div>
      </div>
    </m.div>
  );
};

export default TranslatePage;
