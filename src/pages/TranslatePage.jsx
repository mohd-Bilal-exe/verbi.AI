import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { translate } from "../Api/aiApi";
import TextMarkdownTranslate from "../components/TextMarkdownTranslate";
import { TranslateIcon2 } from "../components/SvgIcons";

const TranslatePage = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [ipText, setIpText] = useState("");
  const [opText, setOpText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("english");
  const [customInstructions, setCustomInstructions] = useState("");

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await translate(
        ipText,
        selectedLang,
        customInstructions
      );
      setOpText(response);
    } catch (error) {
      console.error("Error during translation:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

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
        className={`w-full h-full flex flex-col lg:flex-row gap-2 py-5 lg:pt-14 lg:pb-14 px-3`}
      >
        <div
          className={`w-full flex flex-col border border-copy-lighter shadow-lg  rounded-xl  h-fit lg:h-3/4 overflow-hidden`}
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
            className={`w-full placeholder:pl-2   border-t border-copy-lighter p-0.5 outline-none ${
              isDarkMode
                ? "bg-foreground/30 placeholder:text-copy-light"
                : "bg-foregroundLight/30 placeholder:text-Lightcopy-light"
            }`}
          />
        </div>
        <div
          className={`w-1/6 ${
            isDarkMode ? "" : ""
          } h-1/6  flex items-center justify-center`}
        >
          <button
            onClick={handleTranslate}
            className={`w-12 h-12 p-1  text-white rounded-full flex justify-center items-center${
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
        </div>
        <div
          className={`w-full bg-${
            isDarkMode ? "gray-700" : "white"
          } h-4/5 lg:h-3/4`}
        >
          {MemoizedMarkdown}
        </div>
      </div>
    </motion.div>
  );
};

export default TranslatePage;
