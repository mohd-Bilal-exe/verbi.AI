import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// Extracted SVG icons
import {
  ChatIcon,
  TranslateIcon,
  GrammarCheckIcon,
  HomeIcon,
  ProfileIcon,
  EverythingIcon,
} from "./SvgIcons"; // Example, replace with actual imports

const Navbar = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const setIcon = useCallback(
    (path) => {
      switch (path) {
        case "/chat":
          return <ChatIcon />;
        case "/translate":
          return <TranslateIcon />;
        case "/grammarcheck":
          return <GrammarCheckIcon />;
        default:
          return <EverythingIcon isDarkMode={isDarkMode} />;
      }
    },
    [isDarkMode]
  );

  const listItems = [
    {
      id: 1,
      title: location.pathname.slice(1),
      path:
        location.pathname === "/"
          ? "home"
          : location.pathname === "/profile"
          ? "profile"
          : location.pathname,
    },
    {
      id: 2,
      title: "home",
      path: "/",
      ico: <HomeIcon isDarkMode={isDarkMode} />,
    },
    { id: 4, title: "Profile", path: "/profile", ico: <ProfileIcon /> },
  ];

  const [dynamicIcon, setDynamicIcon] = useState(setIcon(location.pathname));

  useEffect(() => {
    setDynamicIcon(setIcon(location.pathname));
    setSelected(location.pathname);
  }, [location.pathname, setIcon]);

  return (
    <div
      id="container"
      className={`fixed border-t bottom-0 w-screen h-fit flex items-center justify-center montserrat ${
        isDarkMode
          ? "bg-foreground/10 border-border text-copy"
          : "bg-foregroundLight border-borderLight text-copyLight"
      }`}
    >
      <ul
        className={`flex justify-between items-center px-5 pt-2 gap-1 w-screen desktop:w-3/4 laptop:w-3/4 backdrop-blur ${
          isDarkMode ? " bg-lightBg2/10" : "bg-bg3/10"
        }`}
      >
        {listItems.map((listItem) => (
          <motion.li
            key={listItem.id}
            layout
            className="group w-1/4 flex justify-center items-center"
          >
            <Link
              to={listItem.path}
              className="w-full text-xs flex flex-col justify-center items-center"
              onClick={() => setSelected(listItem.path)}
            >
              <span
                key={listItem.id}
                className={`h-7 w-7 ${
                  selected !== listItem.path
                    ? "translate-y-1 "
                    : isDarkMode
                    ? "text-primary-light scale-110"
                    : "text-primary-dark scale-110"
                }  hover:scale-105  ${
                  listItem.id === 1 ? "transition-colors" : "transition-all"
                }
                ${listItem.title === "chat" ? "translate-x-1" : ""}
                ease-in-out duration-500`}
              >
                {listItem.id === 1 ? dynamicIcon : listItem.ico}
              </span>
              <h1
                className={`mb-1 tracking-tightest ${
                  selected === listItem.path
                    ? "translate-y-0"
                    : "translate-y-10"
                } transition-all ease-in-out duration-700 ${
                  isDarkMode ? "text-copy" : "text-copyLight"
                }`}
              >
                {listItem.id != 1 &&
                (listItem.title == "home" || listItem.title == "Profile")
                  ? listItem.title
                  : null}
                {listItem.id == 1 &&
                listItem.path == location.pathname &&
                listItem.title !== "profile"
                  ? `${listItem.title}`
                  : null}
              </h1>
              {selected === listItem.path && (
                <motion.div
                  layout
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                  className={`absolute bottom-0 w-20 h-1 rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-r from-primary-light/60 to-primary-light shadow-[0px_-5px_25px_#9b69f1] laptop:shadow-[0px_-2px_30px_#4cc9f0]"
                      : "bg-gradient-to-r from-primary-dark/60 to-primary-light shadow-[0px_-5px_25px_#7c3aed]"
                  } transition-opacity duration-500`}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
