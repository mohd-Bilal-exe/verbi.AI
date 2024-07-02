import { m } from "framer-motion";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const TextMarkdownTranslate = ({ plainText, history }) => {
  const isDarkMode = useSelector((state) => state.darkMode);

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

  return (
    <m.div
      variants={parentVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full"
    >
      <Markdown
        components={{
          p: ({ ...props }) => (
            <m.p
              variants={fadeInUpVariants}
              className={`text-base mb-2 open-sans ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-dark"
              }`}
              {...props}
            />
          ),
          h1: ({ ...props }) => (
            <m.h1
              variants={fadeInUpVariants}
              className={`text-3xl font-bold mb-4 playfair ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-dark"
              }`}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <m.h2
              variants={fadeInUpVariants}
              className={`text-2xl font-semibold mb-3 montserrat ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-dark"
              }`}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <m.h3
              variants={fadeInUpVariants}
              className={`text-xl font-medium mb-2 montserrat ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-gray-700"
              }`}
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <m.ul
              variants={fadeInUpVariants}
              className={`list-disc list-inside mb-4 ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-gray-800"
              }`}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <m.ol
              variants={fadeInUpVariants}
              className={`list-decimal list-inside mb-4 ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-gray-800"
              }`}
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <m.li
              variants={fadeInUpVariants}
              className={`text-sm mb-1 ml-4 open-sans ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-dark"
              }`}
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <m.strong
              variants={fadeInUpVariants}
              className={`text-lg tracking-wide m-1 font-bold montserrat ${
                isDarkMode
                  ? history
                    ? "text-dark"
                    : "text-light"
                  : "text-dark"
              }`}
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
  history: PropTypes.bool.isRequired,
};

export default TextMarkdownTranslate;
