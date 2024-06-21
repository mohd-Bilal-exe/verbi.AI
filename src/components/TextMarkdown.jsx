import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const TextMarkdown = React.memo(({ keys, role, plainText }) => {
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

  return (
    <motion.div
      className={`h-fit ${
        role === "user"
          ? "place-self-end laptop:w-2/5 smartphone:min-w-48  smartphone:max-w-52  "
          : "place-self-start w-3/5 smartphone:max-w-96  smartphone:min-w-72  my-3 p-3"
      } ${
        isDarkMode
          ? role === "user"
            ? "bg-primary-dark/60"
            : "bg-foreground"
          : role === "user"
          ? "bg-primary-light text-copy"
          : "bg-foreground/10" // Default light mode background color
      } rounded-md`}
      variants={parentVariants}
      initial="initial"
      animate="animate"
    >
      {role === "user" ? (
        <p className="relative flex flex-row min-h-5  my-1 ml-3 mr-2">
          <span className={`w-full`}>{plainText} </span>
          <span className={`scale-75 text-xs place-self-end`}>{keys} </span>
        </p>
      ) : (
        <div className={`flex flex-col`}>
          <Markdown
            key={keys}
            components={{
              p: ({ ...props }) => (
                <motion.p
                  variants={fadeInUpVariants}
                  key={keys++}
                  className={`text-base mb-2 open-sans ${
                    isDarkMode ? "text-lightBg1" : "text-lightMainContent"
                  }`}
                  {...props}
                />
              ),
              h1: ({ ...props }) => (
                <motion.h1
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-3xl font-bold mb-4 playfair ${
                    isDarkMode ? "text-lightBg1" : "text-gray-300"
                  }`}
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <motion.h2
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-2xl font-semibold mb-3 montserrat ${
                    isDarkMode ? "text-lightBg1" : "text-lightHeading"
                  }`}
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <motion.h3
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-xl font-medium mb-2 montserrat ${
                    isDarkMode ? "text-lightBg1" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <motion.ul
                  key={keys++}
                  className={`list-disc list-inside mb-4 ${
                    isDarkMode ? "text-lightBg1" : "text-gray-800"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <motion.ol
                  key={keys++}
                  className={`list-decimal list-inside mb-4 ${
                    isDarkMode ? "text-lightBg1" : "text-gray-800"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <motion.li
                  key={`${keys++}`}
                  className={`text-sm mb-1 ml-4 open-sans ${
                    isDarkMode ? "text-lightBg1" : "text-gray-600"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              strong: ({ ...props }) => (
                <motion.strong
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-lg tracking-widest m-1 font-bold montserrat ${
                    isDarkMode ? "text-white" : "text-lightHeading/70"
                  }`}
                  {...props}
                />
              ),
            }}
          >
            {plainText}
          </Markdown>
          <span className={`-mb-2 -ml-1 scale-75 text-xs place-self-start`}>
            {keys}
          </span>
        </div>
      )}
    </motion.div>
  );
});

TextMarkdown.propTypes = {
  keys: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  plainText: PropTypes.string.isRequired,
};

// Set displayName explicitly for the component
TextMarkdown.displayName = "TextMarkdown";

export default TextMarkdown;