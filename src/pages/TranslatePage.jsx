import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Swap } from "@phosphor-icons/react";
import { translate } from "../Api/aiApi";
import DropDown from "../components/DropDown";
import TextMardown from "../components/TextMarkdown";

const TranslatePage = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [ipText, setIpText] = useState("Add Text to translate");
  const [opText, setOpText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("english");
  const [customInstructions, setCustomInstructions] = useState("");
  
  const handleTranslate = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Call the translate API with input text, selected language, and custom instructions
      const response = await translate(ipText, selectedLang, customInstructions);
      // Update the UI with the translated text
      setOpText(response);
      setIpText(""); // Clear the input text area
      setCustomInstructions(""); // Clear the custom instructions
    } catch (error) {
      console.error("Error during translation:", error); // Log any errors that occur
      // Handle error appropriately, e.g., display an error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  const MemoizedMarkdown = useMemo(() => (
    <TextMardown plainText={opText} />
  ), [opText]);

  return (
    <motion.div
      key="TranslatePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen flex justify-center py-4 flex-row smartphone:flex-col-reverse pb-20 smartphone:pb-32 ${isDarkMode ? "text-white" : "text-bg1"}`}
    >
      <div className={`relative w-screen h-full laptop:w-1/2 laptop:h-full text-2xl p-6 smartphone:p-2 ${isDarkMode ? "bg-bg3/10 text-lightBg1" : "bg-lightBg1/60 text-bg2"}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" p-2 rounded-2xl absolute right-6 top-6 smartphone:top-3 smartphone:right-3"
        >
          <DropDown setSelectedLang={setSelectedLang} />
        </motion.div>
        <textarea
          name="before"
          value={ipText}
          onChange={(e) => setIpText(e.target.value)}
          className={`w-full h-72 laptop:h-full p-2 px-3 pt-14 text-lg rounded-2xl border resize-none overflow-y-auto ${isDarkMode ? "bg-lightBg1/60 text-bg2" : "bg-bg3/10 text-bg2"}`}
        ></textarea>
        <span className={`w-full h-fit flex items-center justify-between rounded-full ${isDarkMode ? "bg-lightBg1/60 text-bg2" : "bg-bg3/10 text-lightBg1"} pl-3 pr-1 py-1`}>
          <input
            type="text"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            className={`w-full h-full outline-none text-lg placeholder:text-lg placeholder:text-center placeholder:pl-1 bg-transparent placeholder:text-bg1`}
            placeholder="Add custom Instructions for translation"
          />
        </span>
      </div>
      <div
        id="translateButton"
        className="flex items-center justify-center pb-10 smartphone:pb-0"
      >
        <motion.span
          className="grid place-content-center bg-gradient-to-br from-DarkAccentBluelt to-DarkAccentBluedk p-1 rounded-full"
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            type: "spring",
            repeat: loading ? Infinity : 0,
          }}
        >
          <button
            onClick={handleTranslate}
            className="w-10 h-10 p-1.5 bg-bg3 text-white rounded-full hover:bg-transparent active:scale-100 hover:scale-110 hover:text-bg1 transition-colors"
          >
            <Swap size={"100%"} weight="duotone" />
          </button>
        </motion.span>
      </div>
      <div className="w-screen h-1/2 laptop:w-1/2 laptop:h-full text-2xl p-6 smartphone:p-2">
        <motion.div
          initial="initial"
          animate="animate"
          className="w-full h-full p-2 px-3 text-lg rounded-2xl bg-transparent border resize-none overflow-y-auto smartphone:p-2"
        >
          {opText && MemoizedMarkdown}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TranslatePage;