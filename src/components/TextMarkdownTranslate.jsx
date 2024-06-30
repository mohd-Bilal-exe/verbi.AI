import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const TextMarkdownTranslate = ({ plainText }) => {
  const isDarkMode = useSelector((state) => state.darkMode);

  const parentVariants = {
    animate: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Counter for generating unique keys
  let keyCounter = 0;

  return (
    <motion.div variants={parentVariants} className={`w-full h-full`}>
      <Markdown
        components={{
          p: ({ ...props }) => (
            <motion.p
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-base mb-2 open-sans ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
              {...props}
            />
          ),
          h1: ({ ...props }) => (
            <motion.h1
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-3xl font-bold mb-4 playfair ${
                isDarkMode ? "text-lightBg1" : "text-gray-300"
              }`}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <motion.h2
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-2xl font-semibold mb-3 montserrat ${
                isDarkMode ? "text-lightBg1" : "text-lightHeading"
              }`}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <motion.h3
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-xl font-medium mb-2 montserrat ${
                isDarkMode ? "text-lightBg1" : "text-gray-700"
              }`}
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <motion.ul
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`list-disc list-inside mb-4 ${
                isDarkMode ? "text-lightBg1" : "text-gray-800"
              }`}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <motion.ol
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`list-decimal list-inside mb-4 ${
                isDarkMode ? "text-lightBg1" : "text-gray-800"
              }`}
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <motion.li
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-sm mb-1 ml-4 open-sans ${
                isDarkMode ? "text-copy-light" : "text-copyLight"
              }`}
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <motion.strong
              key={keyCounter++}
              variants={fadeInUpVariants}
              className={`text-lg tracking-wide m-1 font-bold montserrat ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
              {...props}
            />
          ),
        }}
      >
        {plainText}
      </Markdown>
    </motion.div>
  );
};
TextMarkdownTranslate.propTypes = {
  plainText: PropTypes.string.isRequired,
};
export default TextMarkdownTranslate;
