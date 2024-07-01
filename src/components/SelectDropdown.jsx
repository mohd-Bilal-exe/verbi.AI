import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CaretCircleDown,
  Check,
} from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { getLanguagesWithFlags } from "../Api/langAPI";
import PropTypes from "prop-types";

const SelectDropdown = ({ selectedLang, setSelectedLang, isDropdownOpen }) => {
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLangList = langList.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="relative w-fit">
      <button
        onClick={toggleDropdown}
        className={`w-11/12 min-w-32 m-2 px-2 py-1 rounded-lg ${
          !isDarkMode ? "bg-foreground/30" : "bg-foregroundLight/30"
        } flex justify-between items-center`}
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute w-60 -start-1/3 smartphone:-start-10 z-10 mt-1 backdrop-blur backdrop-brightness-75  rounded-md shadow-lg`}
          >
            <div className="grid place-content-center  grid-cols-2 gap-1 p-2 auto-rows-min">
              {currentLangList.map((languageList, index) => (
                <button
                  key={index}
                  onClick={() => handleLanguageSelect(languageList.language)}
                  className={`p-2 flex items-center gap-1 w-fit text-center rounded-md hover:bg-neutral-600 ${
                    selectedLang === languageList.language
                      ? "bg-blue-800/30 text-copy-light"
                      : ""
                  } transition-all duration-300 `}
                >
                  <span>
                    <img
                      src={languageList.flag}
                      alt={languageList.language}
                      className={`h-3`}
                    />
                  </span>
                  <span className={`text-xs h-4 text-balance overflow-hidden`}>
                    {languageList.language}{" "}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-between my-1">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ArrowCircleLeft size={25} weight="duotone" />
              </button>
              <div className={` flex justify-center`}>
                <input
                  type="text"
                  placeholder="Custom language"
                  onChange={(e) => {
                    setSelectedLang(e.target.value);
                  }}
                  className={`w-3/4 outline-none placeholder:pl-1 pl-1 rounded-sm ${
                    !isDarkMode ? "bg-foreground/10" : "bg-foregroundLight/10"
                  }`}
                />
                <button
                  className={`${
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
                className={`rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ${
                  currentPage === Math.ceil(langList.length / itemsPerPage)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ArrowCircleRight size={25} weight="duotone" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SelectDropdown.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  setSelectedLang: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool,
};

export default SelectDropdown;
