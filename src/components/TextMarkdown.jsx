import React from "react";
import { m } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import formatTime from "../utilities/dateString";

const TextMarkdown = React.memo(({ keys, role, plainText }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const formatTimefunc = (keys) => formatTime(keys);
  const parentVariants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <m.div
      className={`h-fit text-wrap  ${
        role === "user"
          ? "place-self-end laptop:w-2/5 smartphone:min-w-48  smartphone:max-w-52  "
          : "place-self-start w-11/12 smartphone:w-11/12  my-3 p-3"
      } bg-gradient-to-br  ${
        isDarkMode
          ? role === "user"
            ? "from-accent2 to-accent2lt"
            : "bg-foreground"
          : role === "user"
          ? "from-blue-400 to-accent2lt text-copy"
          : "bg-foreground/10"
      } rounded-md`}
      variants={parentVariants}
      initial="initial"
      animate="animate"
    >
      {role === "user" ? (
        <m.p
          key={`${keys}user`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="relative flex flex-row min-h-5 h-fit  my-1 ml-3 mr-2"
        >
          <span className={`w-4/5 text-wrap`}>{plainText} </span>
          <span className={`w-fit scale-75 text-xs place-self-end`}>
            {formatTimefunc(keys)}
          </span>
        </m.p>
      ) : (
        <div className={`flex flex-col select-text`}>
          <Markdown
            key={keys}
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
                  className={`list-disc list-inside mb-4 ${
                    isDarkMode ? "text-lightBg1" : "text-gray-800"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <m.ol
                  key={keys++}
                  className={`list-decimal list-inside mb-4 ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <m.li
                  key={`${keys++}a`}
                  className={`text-sm mb-1 ml-4 open-sans ${
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
                    isDarkMode
                      ? "text-blue-100 bg-blue-500/50 p-1 rounded"
                      : "text-blue-500"
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
            }}
          >
            {plainText}
          </Markdown>
          <span className={`-mb-2 -ml-1 scale-75 text-xs place-self-start`}>
            {formatTime(keys)}
          </span>
        </div>
      )}
    </m.div>
  );
});

TextMarkdown.propTypes = {
  keys: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  plainText: PropTypes.string.isRequired,
};

// Seting displayName explicitly for the component
TextMarkdown.displayName = "TextMarkdown";

export default TextMarkdown;
