import PropTypes from "prop-types";
import { CaretDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CaretCircleDown,
  Check,
} from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { getLanguagesWithFlags } from "../Api/langAPI";
export const LangDropDown = ({
  selectedLang,
  setSelectedLang,
  isDropdownOpen,
}) => {
  const [langList, setLanglist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust this number based on your preference

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getLanguagesWithFlags();
      setLanglist(response);
    };
    fetchLanguages();
  }, [isDropdownOpen]);

  const isDarkMode = useSelector((state) => state.darkMode);
  const [isDropdownOpenState, setIsDropdownOpenState] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpenState(!isDropdownOpenState);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
    setIsDropdownOpenState(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(langList.length / itemsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLangList = langList.slice(startIndex, endIndex);
  return (
    <div className="relative w-fit">
      <button
        onClick={toggleDropdown}
        className={`w-11/12 min-w-32 m-2 px-2 py-1 rounded-lg ${
          !isDarkMode ? "bg-foreground/30" : "bg-foregroundLight/10"
        } flex justify-between items-center text-xs`}
      >
        <span>{selectedLang}</span>
        <CaretCircleDown
          className={`ml-2 transform transition-transform ${
            isDropdownOpenState ? "rotate-180" : "rotate-0"
          } ease-in-out duration-300`}
          size={20}
          weight="duotone"
        />
      </button>
      <AnimatePresence>
        {isDropdownOpenState && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute w-60 -start-1/3 smartphone:-start-10 z-10 mt-1 backdrop-blur backdrop-brightness-75 rounded-md shadow-lg`}
          >
            <div className="grid place-content-center grid-cols-2 gap-1 p-2 auto-rows-min">
              {currentLangList.map((languageList, index) => (
                <button
                  key={index}
                  onClick={() => handleLanguageSelect(languageList.language)}
                  className={`p-2 flex items-center gap-1 w-fit text-center rounded-md hover:bg-neutral-600 bg-gradient-to-br ${
                    selectedLang === languageList.language
                      ? `${
                          isDarkMode
                            ? "from-green-400/10 to-teal-500/10"
                            : "from-green-300/10 to-teal-400/10"
                        }`
                      : ""
                  } transition-all duration-300 `}
                >
                  <span>
                    <img
                      src={languageList.flag}
                      alt={languageList.language}
                      className={`h-3`}
                      loading="lazy"
                    />
                  </span>
                  <m.span
                    key={index + "text"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-xs h-4 text-balance overflow-hidden`}
                  >
                    {languageList.language}{" "}
                  </m.span>
                </button>
              ))}
            </div>
            <div className="flex justify-between my-1">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`rounded-full bg-green-400/60 text-black hover:bg-teal-500/60 transition-all duration-300 ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ArrowCircleLeft size={25} weight="duotone" />
              </button>
              <div className={`flex justify-center w-3/4`}>
                <input
                  type="text"
                  placeholder="Custom language"
                  onChange={(e) => {
                    setSelectedLang(e.target.value);
                  }}
                  className={`w-full outline-none pl-1 text-sm placeholder:text-sm  rounded-l-md ${
                    !isDarkMode
                      ? "bg-foreground/10 placeholder:text-copyLight"
                      : "bg-foregroundLight/10 placeholder:text-copy"
                  }`}
                />
                <button
                  className={` rounded-r-md ${
                    !isDarkMode ? "bg-foreground/10" : "bg-foregroundLight/10"
                  }`}
                  onClick={() => setIsDropdownOpenState(false)}
                >
                  <Check weight="duotone" size={25} />
                </button>
              </div>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(langList.length / itemsPerPage)
                }
                className={`rounded-full bg-green-400/60 text-black hover:bg-teal-500/60 transition-all duration-300 ${
                  currentPage === Math.ceil(langList.length / itemsPerPage)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ArrowCircleRight size={25} weight="duotone" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

LangDropDown.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  setSelectedLang: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool,
};

export const StyleDropDown = ({ setSelected, title, place }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(title);

  const Lists =
    place === "editModal"
      ? title === "tone"
        ? [
            { code: "professional", name: "💼 Professional" },
            { code: "friendly", name: "😄 Friendly" },
            { code: "informative", name: "🧐 Informative" },
            { code: "formal", name: "🎩 Formal" },
            { code: "casual", name: "😊 Casual" },
            { code: "respectful", name: "🙏 Respectful" },
            { code: "supportive", name: "🤗 Supportive" },
            { code: "motivational", name: "🚀 Motivational" },
          ]
        : [
            { code: "sarcastic", name: "😏 Sarcastic" },
            { code: "witty", name: "😄 Witty" },
            { code: "thoughtful", name: "🤔 Thoughtful" },
            { code: "creative", name: "🌟 Creative" },
            { code: "humorous", name: "😂 Humorous" },
            { code: "inspirational", name: "🌈 Inspirational" },
            { code: "reflective", name: "🪞 Reflective" },
            { code: "whimsical", name: "🦄 Whimsical" },
          ]
      : title === "tone"
      ? [
          { code: "professional", name: "💼 Professional" },
          { code: "casual", name: "😊 Casual" },
          { code: "friendly", name: "😄 Friendly" },
          { code: "informative", name: "🧐 Informative" },
        ]
      : [
          { code: "sarcastic", name: "😏 Sarcastic" },
          { code: "witty", name: "😄 Witty" },
          { code: "thoughtful", name: "🤔 Thoughtful" },
          { code: "creative", name: "🌟 Creative" },
        ];

  return (
    <div className="w-fit h-fit relative">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          type="button" // Set type to "button" to prevent form submission
          onClick={() => setOpen((pv) => !pv)}
          className="w-32 flex items-center justify-between gap-1 transition-all px-2 py-2 rounded-lg text-copyLight bg-gradient-to-br from-copy to-copy-light"
        >
          <span className="font-medium text-xs">{message}</span>
          <motion.span variants={iconVariants}>
            <CaretDown size={15} weight="duotone" />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className={` grid  place-content-center p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] ${
            place === "editModal" ? "w-[320px] grid-cols-3" : "w-48 grid-cols-2"
          }  h-fit`}
        >
          {Lists.map((item) => (
            <Option
              key={item.code}
              setOpen={setOpen}
              setSelected={setSelected}
              setMessage={setMessage}
              text={item.name}
              code={item.code}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, code, setSelected, setMessage, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSelected(code);
        setMessage(text);
        setOpen(false);
      }}
      className="flex items-center justify-center p-2 w-fit text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

StyleDropDown.propTypes = {
  setSelected: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  place: PropTypes.string,
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

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