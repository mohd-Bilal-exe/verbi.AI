import PropTypes from "prop-types";
import { CircleNotch } from "@phosphor-icons/react";
import { m } from "framer-motion";
import { useSelector } from "react-redux";

const DoButton = ({ loading, func, classes, text }) => {
  const isDarkMode = useSelector((state) => state.darkMode);

  return (
    <button
      onClick={func}
      className={`w-24 h-10 text-sm rounded-xl flex flex-col items-center justify-center gap-2 ${
        isDarkMode
          ? "bg-backgroundLight text-copyLight"
          : "bg-background/90 text-copy"
      } ${
        loading ? `cursor-not-allowed ${classes}` : "cursor-pointer"
      } overflow-hidden transition-colors duration-700 delay-1000`}
      disabled={loading}
      aria-label="Check Grammar Now"
    >
      <m.span
        key="spinnerCont"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: loading ? 21 : -22, opacity: 1 }}
        transition={{
          duration: 0.7,
          type: "spring",
          ease: "easeInOut",
        }}
        className="w-full h-fit flex flex-col items-center"
      >
        <m.span
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            type: "spring",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="my-2.5 flex justify-center items-center w-6 h-6"
        >
          <CircleNotch className="w-6 h-6" weight="bold" />
        </m.span>
        <span className="py-2.5 tracking-wider montserrat">{text}</span>
      </m.span>
    </button>
  );
};

DoButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired,
  classes: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default DoButton;
