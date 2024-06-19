import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Swap } from "@phosphor-icons/react";
import { translate } from "../Api/aiApi";
import DropDown from "../components/DropDown";
import Markdown from "react-markdown";

const TranslatePage = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [ipText, setIpText] = useState("Add Text to translate");
  const [opText, setOpText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("english");

  const handleTranslate = async () => {
    setLoading(true);
    const response = await translate(ipText, selectedLang);
    setOpText(response);
    setLoading(false);
  };

  const staggerVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }), []);

  const fadeInUpVariants = useMemo(() => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  }), []);

  // Memoize Markdown component to prevent unnecessary re-renders
  const MemoizedMarkdown = useMemo(() => {
    return (
      <Markdown
        key={opText} // Ensure key changes only when opText changes
        components={{
          p: (props) => <motion.p variants={fadeInUpVariants} {...props} />,
          h1: (props) => <motion.h1 variants={fadeInUpVariants} {...props} />,
          h2: (props) => <motion.h2 variants={fadeInUpVariants} {...props} />,
          h3: (props) => <motion.h3 variants={fadeInUpVariants} {...props} />,
          li: (props) => <motion.li variants={fadeInUpVariants} {...props} />,
        }}
      >
        {opText}
      </Markdown>
    );
  }, [opText, fadeInUpVariants]);

  return (
    <motion.div
      key="TranslatePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen flex flex-row smartphone:flex-col-reverse smartphone:pb-32 ${
        isDarkMode ? "text-white" : "text-bg1"
      }`}
    >
      <div className="relative w-screen h-1/2 laptop:w-1/2 laptop:h-full text-2xl p-6 pb-20 smartphone:p-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-black p-2 rounded-lg absolute right-9 top-9 smartphone:top-3 smartphone:right-3"
        >
          <DropDown setSelectedLang={setSelectedLang} />
        </motion.div>
        <textarea
          name="before"
          value={ipText}
          onChange={(e) => setIpText(e.target.value)}
          className="w-full h-full smartphone: p-2 px-3 pt-14 text-lg rounded-lg bg-transparent border resize-none overflow-y-auto"
        ></textarea>
      </div>
      <div
        id="translateButton"
        className="h-full smartphone:h-fit flex items-center justify-center pb-10 smartphone:p-0"
      >
        <motion.span
          className="bg-gradient-to-br from-DarkAccentBluelt to-DarkAccentBluedk p-0.5 rounded-full"
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
            className="p-2 bg-bg1 text-white rounded-full hover:bg-transparent hover:text-bg1 transition-colors"
          >
            <Swap size={32} weight="duotone" />
          </button>
        </motion.span>
      </div>
      <div className="w-screen h-1/2 laptop:w-1/2 laptop:h-full text-2xl p-6 pb-20 smartphone:p-2">
        <motion.div
          variants={staggerVariants}
          initial="initial"
          animate="animate"
          className="w-full h-full p-2 px-3 text-lg rounded-lg bg-transparent border resize-none overflow-y-auto smartphone:p-2"
        >
          {opText && MemoizedMarkdown}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TranslatePage;
