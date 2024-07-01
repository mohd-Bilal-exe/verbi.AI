import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { translate } from "../Api/aiApi";
import TextMarkdownTranslate from "../components/TextMarkdownTranslate";
import { TranslateIcon2 } from "../components/SvgIcons";
import SelectDropdown from "../components/SelectDropdown";
import { getLanguagesWithFlags } from "../Api/langAPI";
import formatTime from "../utilities/dateString";
import { addTranslations, globalHistory } from "../Redux/Actions";

const TranslatePage = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [ipText, setIpText] = useState("");
  const [opText, setOpText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [customInstructions, setCustomInstructions] = useState("");
  const dispatch = useDispatch();
  const formatTimefunc = (keys) => formatTime(keys);
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
          type: "Translations",
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
  useEffect(() => {
    getLanguagesWithFlags();
  }, []);
  const MemoizedMarkdown = useMemo(
    () => <TextMarkdownTranslate plainText={opText} />,
    [opText]
  );

  return (
    <motion.div
      key="TranslatePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen ${
        isDarkMode ? "text-copy" : "text-copyLight"
      }`}
    >
      <div
        className={`w-full h-full flex flex-col justify-start items-start lg:flex-row gap-1 pt-16 smartphone:pt-5  px-3`}
      >
        <div
          className={`w-full flex flex-col border border-copy-lighter shadow-lg  rounded-xl smartphone:h-1/3 h-3/4 overflow-hidden`}
        >
          <textarea
            name="ipText"
            id="ipText"
            placeholder="Enter text to Translate"
            value={ipText}
            onChange={(e) => setIpText(e.target.value)}
            className={`resize-none outline-none w-full h-full p-2 ${
              isDarkMode
                ? "bg-foreground/30 placeholder:text-copy-light"
                : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
            } `}
          ></textarea>
          <input
            type="text"
            placeholder="Add your custom instructions"
            onChange={(e) => setCustomInstructions(e.target.value)}
            className={`w-full placeholder:pl-2 pl-2  border-t border-copy-lighter p-0.5 outline-none ${
              isDarkMode
                ? "bg-foreground/30 placeholder:text-copy-light"
                : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
            }`}
          />
        </div>
        <div
          className={`w-1/6 h-3/4 smartphone:w-full smartphone:h-fit smartphone:py-4  ${
            isDarkMode ? "" : ""
          } h-1/6  flex flex-col smartphone:flex-row-reverse  gap-4 items-center justify-center`}
        >
          <button
            onClick={handleTranslate}
            className={`w-12 h-12 p-1 text-white rounded-full flex justify-center items-center ${
              isDarkMode
                ? "bg-blue-800/30 placeholder:text-copy-light"
                : "bg-blue-500/30 placeholder:text-Lightcopy-light"
            } ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
          >
            <motion.span
              initial={{ rotate: 0 }}
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                ease: "easeInOut",
                repeat: loading ? Infinity : 0,
              }}
              className={`w-12 h-12 flex justify-center items-center `}
              key="icooons"
            >
              <TranslateIcon2 className="w-9 h-9" />
            </motion.span>
          </button>
          <SelectDropdown
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            isDropdownOpenn={!loading}
          />
        </div>
        <div
          className={`w-full  smartphone:w-full smartphone:h-2/5  scroll-smooth  border border-copy-lighter shadow-lg  rounded-xl p-2 overflow-y-auto  ${
            isDarkMode
              ? "bg-foreground/30 placeholder:text-copy-light"
              : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
          } border h-3/4`}
        >
          {MemoizedMarkdown}
        </div>
      </div>
    </motion.div>
  );
};

export default TranslatePage;
