import { m } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Copy } from "@phosphor-icons/react";

const TextMarkdownTranslate = ({ plainText, history }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const transformString = (str) => {
    if (!str) return str; // Handle null or undefined input
    let result = str
      .split("")
      .map((char, index) => {
        if (index === 0 || index === 9) return char.toUpperCase();
        return char;
      })
      .join("");
    return result;
  };
  const parentVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { staggerChildren: history ? 0.1 : 0.3 },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: history ? 0.1 : 0.5 },
    },
  };

  // Unique key for each rendered Markdown component
  let keys = 0;

  return (
    <m.div
      variants={parentVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full select-text"
    >
      <Markdown
        components={{
          p: ({ ...props }) => (
            <m.p
              variants={fadeInUpVariants}
              key={keys++}
              className={`text-base mb-2 open-sans ${
                isDarkMode ? "text-lightBg1" : "text-lightMainContent"
              }`}
              {...props}
            />
          ),
          h1: ({ ...props }) => (
            <m.h1
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-3xl font-bold mb-4 playfair ${
                isDarkMode ? "text-lightBg1" : "text-gray-300"
              }`}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <m.h2
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-2xl font-semibold mb-3 montserrat ${
                isDarkMode ? "text-lightBg1" : "text-lightHeading"
              }`}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <m.h3
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-xl font-medium mb-2 montserrat ${
                isDarkMode ? "text-lightBg1" : "text-gray-700"
              }`}
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <m.ul
              key={keys++}
              className={`list-disc list-inside overflow-auto  mb-4 ${
                isDarkMode ? "text-lightBg1" : "text-gray-800"
              }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <m.ol
              key={keys++}
              className={`list-decimal list-inside overflow-auto  mb-4 ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <m.li
              key={`${keys++}a`}
              className={`text-sm mb-1 ml-4 overflow-auto  open-sans ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <m.strong
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-lg tracking-widest m-1 font-bold montserrat ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <m.a
              key={keys++}
              target="_blank"
              className={`underline ${
                isDarkMode ? "text-blue-400  p-1 rounded" : "text-blue-600"
              }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <div>
              <div
                className={`flex justify-between p-3 rounded-t-lg ${
                  isDarkMode
                    ? "bg-backgroundLight/10 text-copy"
                    : "bg-gray-100 text-copyLight"
                }`}
              >
                <h1 className={`text-sm`}>
                  {transformString(props.children.props.className)}
                </h1>
                <button
                  onClick={() =>
                    handleCopyToClipboard(props.children.props.children)
                  }
                  className={`flex gap-1 p-1 px-2 justify-center items-center text-sm rounded ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                >
                  <Copy weight="duotone" />
                  Copy code
                </button>
              </div>
              <m.pre
                key={keys++}
                variants={fadeInUpVariants}
                {...props}
                className={`overflow-x-auto rounded-b-lg p-2 ${
                  isDarkMode
                    ? "bg-black/40 text-copy"
                    : "bg-gray-100 text-copyLight"
                }`}
              />
            </div>
          ),
          code: ({ ...props }) => (
            <m.code
              key={keys++}
              className={`font-mono text-xs ${
                isDarkMode
                  ? "bg-gray-800 text-copy p-1 rounded"
                  : "bg-gray-200 text-copyLight p-1 rounded"
              }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
        }}
      >
        {plainText}
      </Markdown>
    </m.div>
  );
};

TextMarkdownTranslate.propTypes = {
  plainText: PropTypes.string.isRequired,
  children: PropTypes.object,
  history: PropTypes.bool,
};

export default TextMarkdownTranslate;
