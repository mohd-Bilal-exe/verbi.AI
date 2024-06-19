import PropTypes from "prop-types";
import { CaretDown, CheckCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";

const DropDown = ({ setSelectedLang }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage]=useState("Select Language");
  const languages = [
    { code: "English", name: "English" },
    { code: "Hindi", name: "Hindi" },
    { code: "Urdu", name: "Urdu" },
    { code: "Arabic", name: "Arabic" },
    { code: "Spanish", name: "Spanish" },
    { code: "Japanese", name: "Japanese" },
    { code: "Custom", name: "customLang" },
  ];

  return (
    <div className="">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="w-36 flex items-center justify-between gap-2 smartphone:gap-1 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-xs">{message}</span>
          <motion.span variants={iconVariants}>
            <CaretDown size={15} weight="duotone" />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-1 p-1.5 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-36 overflow-hidden"
        >
          {languages.map((language) => (
            <Option
              key={language.code}
              setOpen={setOpen}
              setSelectedLang={setSelectedLang}
              setMessage={setMessage}
              text={language.name}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, setSelectedLang,setMessage, setOpen }) => {
    const handleCustomLangSubmit = (e) => {
        e.preventDefault();
        const customLang = e.target.elements.customLang.value.trim();
        if (customLang) {
          setSelectedLang(customLang);
          setMessage(customLang)
          setOpen(false);
        }
      };
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSelectedLang(text);
        if(text !== "customLang") setOpen(false)
        setMessage(text);
      }}
      className="flex items-center gap-2 w-full  text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      {text !== "customLang" ? (
        <>
          <motion.div
            key={"divDots"}
            className="w-1 h-1 m-1 rounded-full bg-DarkAccentBluedk"
            variants={actionIconVariants}
          ></motion.div>
          <span
            className="w-ful m-2 text-xs"
            onClick={() => {
              setOpen(false);
            }}
          >
            {text}
          </span>
        </>
      ) : (
        <>
          <form className="ml-1 flex items-center w-full" onSubmit={handleCustomLangSubmit}>
            <input
              name="customLang"
              className="w-4/5 h-full outline-none rounded-sm placeholder:text-xs focus:outline-DarkAccentBluedk border border-gray-300"
              placeholder="Custom Language"
            />
            <button
              type="submit"
              className="rounded-full mx-auto flex  text-xs bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            >
               <CheckCircle size={18} weight="duotone" />
            </button>
          </form>
        </>
      )}
    </motion.li>
  );
};

DropDown.propTypes = {
  setSelectedLang: PropTypes.func.isRequired,
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  setSelectedLang: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.02,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
