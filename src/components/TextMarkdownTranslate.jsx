import { m } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Copy } from "@phosphor-icons/react";

// Memorized chat component AI responses(Formatted using React Markdown) in translate/GrammarCheck pages.
const TextMarkdownTranslate = ({ plainText, history }) => {
  const isDarkMode = useSelector((state) => state.darkMode);  // Get the dark mode state from the Redux store.
  // A function that copies the provided text to the clipboard.
  const handleCopyToClipboard = (text) => {
    navigator.clipboard  // Access the Clipboard API
      .writeText(text)  // Write the text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");  // Display a success alert
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);  // Log any error that occurs
        console.error("Failed to copy text: ", err);
      });
  };
  // Function that capitalizes the first and tenth characters of a string.
  const transformString = (str) => {
    // If the input is null or undefined, return it as is.
    if (!str) return str;

    // Split the string into an array of characters.
    if (!str) return str; // Handle null or undefined input
    let result = str
      .split("")
      // Map over each character, capitalizing the first and tenth characters.
      .map((char, index) => {
        // If the index is 0 or 9, capitalize the character.
        if (index === 0 || index === 9) return char.toUpperCase();
        // Otherwise, return the character as is.
        return char;
      })
      // Join the array of characters back into a string.
      .join("");

    // Return the transformed string.
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
  // Render the component
  return (
    <m.div
      variants={parentVariants}
      initial="initial"
      animate="animate"
      className={`w-full h-full select-text ${history ? "text-copyLight" : isDarkMode ? "text-copy" : "text-copyLight"
        } `}
    >
      <Markdown
        components={{
          p: ({ ...props }) => (
            <m.p
              variants={fadeInUpVariants}
              key={keys++}
              className={`text-base mb-2 open-sans `}
              {...props}
            />
          ),
          h1: ({ ...props }) => (
            <m.h1
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-3xl font-bold mb-4 playfair`}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <m.h2
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-2xl font-semibold mb-3 montserrat `}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <m.h3
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-xl font-medium mb-2 montserrat `}
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <m.ul
              key={keys++}
              className={`list-disc list-inside overflow-auto  mb-4 `}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <m.ol
              key={keys++}
              className={`list-decimal list-inside overflow-auto  mb-4 `}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <m.li
              key={`${keys++}a`}
              className={`text-sm mb-1 ml-4 overflow-auto  open-sans `}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <m.strong
              key={keys++}
              variants={fadeInUpVariants}
              className={`text-lg tracking-widest m-1 font-bold montserrat `}
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <m.a
              key={keys++}
              target="_blank"
              className={`underline ${isDarkMode ? "text-blue-400  p-1 rounded" : "text-blue-600"
                }`}
              variants={fadeInUpVariants}
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <div>
              <div
                className={`flex justify-between p-3 rounded-t-lg ${isDarkMode
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
                  className={`flex gap-1 p-1 px-2 justify-center items-center text-sm rounded ${isDarkMode ? "text-copy" : "text-copyLight"
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
                className={`overflow-x-auto rounded-b-lg p-2 ${isDarkMode
                  ? "bg-black/40 text-copy"
                  : "bg-gray-100 text-copyLight"
                  }`}
              />
            </div>
          ),
          code: ({ ...props }) => (
            <m.code
              key={keys++}
              className={`font-mono text-xs ${isDarkMode
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
