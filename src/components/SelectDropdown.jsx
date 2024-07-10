import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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

SelectDropdown.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  setSelectedLang: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool,
};

export default SelectDropdown;
