import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretCircleDown } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Hindi",
];

const SelectDropdown = ({ selectedLang, setSelectedLang }) => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-fit">
      <button
        onClick={toggleDropdown}
        className={`w-11/12 m-2 px-2 py-1 rounded-lg ${
          !isDarkMode ? "bg-foreground/30" : "bg-foregroundLight/30"
        } flex justify-center items-center`}
      >
        <span>{selectedLang}</span>
        <CaretCircleDown
          className={`ml-2 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          } ease-in-out duration-300`}
          size={20}
          weight="duotone"
        />
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute w-60 -start-2/3 smartphone:-start-14 z-10 mt-1 backdrop-blur backdrop-brightness-75  rounded-md shadow-lg`}
          >
            <div className="grid place-content-center  grid-cols-2 gap-1 p-2 auto-rows-min">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className={`p-2 w-fit text-center rounded-md hover:bg-neutral-600 ${
                    selectedLang === language
                      ? "bg-blue-800/30 text-copy-light"
                      : ""
                  } transition-all duration-300 `}
                >
                  {language}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDropdown;
