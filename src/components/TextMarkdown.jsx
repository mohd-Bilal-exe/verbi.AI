import React from "react";
import { m } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import formatTime from "../utilities/dateString";
import { Copy } from "@phosphor-icons/react";

const TextMarkdown = React.memo(({ keys, role, plainText }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const formatTimefunc = (keys) => formatTime(keys);
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
          ? "place-self-end lg:w-2/5 mt-1 smartphone:min-w-48  smartphone:max-w-72  "
          : "place-self-start w-full  my-3 p-3 smartphone:p-2"
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
          <span className={`w-11/12 text-wrap overflow-x-hidden`}>
            {plainText}{" "}
          </span>
          <span
            className={`w-fit z-10 scale-75 text-xs place-self-end items-end`}
          >
            {formatTimefunc(keys)}
          </span>
        </m.p>
      ) : (
        <div className={`flex flex-col select-text`}>
          <Markdown
            key={keys++}
            components={{
              p: ({ ...props }) => (
                <m.p
                  variants={fadeInUpVariants}
                  key={keys++}
                  className={`text-base mb-2 open-sans ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  {...props}
                />
              ),
              h1: ({ ...props }) => (
                <m.h1
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-3xl font-bold mb-4 playfair ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <m.h2
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-2xl font-semibold mb-3 montserrat ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <m.h3
                  key={keys++}
                  variants={fadeInUpVariants}
                  className={`text-xl font-medium mb-2 montserrat ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <m.ul
                  key={keys++}
                  className={`list-disc list-inside  overflow-auto mb-4 ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  } pl-0 ml-0`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <m.ol
                  key={keys++}
                  className={`list-decimal list-inside overflow-auto mb-4 ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  } pl-0 ml-0`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <m.li
                  key={`${keys++}a`}
                  className={`text-sm mb-1 ml-4  overflow-auto  open-sans ${
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
                  className={`text-md tracking-widest m-1 font-bold montserrat ${
                    isDarkMode ? "text-copy" : "text-copyLight"
                  }`}
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <m.a
                  key={keys++}
                  target="_blank"
                  href={props.href}
                  className={`underline ${
                    isDarkMode
                      ? "text-blue-400  rounded bg-gray-800 hover:bg-gray-700"
                      : "text-blue-600 rounded bg-gray-200 hover:bg-gray-300"
                  } transition-colors duration-300 ease-in-out`}
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
                  className={`font-mono  ${
                    isDarkMode ? " text-red-500 " : " text-red-400 "
                  }`}
                  variants={fadeInUpVariants}
                  {...props}
                />
              ),
            }}
          >
            {plainText}
          </Markdown>
          <span
            className={`-mb-2 -ml-1 z-10 scale-75 text-xs place-self-start`}
          >
            {formatTime(keys)}
          </span>
        </div>
      )}
    </m.div>
  );
});

TextMarkdown.propTypes = {
  keys: PropTypes.number.isRequired,
  children: PropTypes.object,
  href: PropTypes.string,
  role: PropTypes.string.isRequired,
  plainText: PropTypes.string.isRequired,
};

// Seting displayName explicitly for the component
TextMarkdown.displayName = "TextMarkdown";

export default TextMarkdown;
