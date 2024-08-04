import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { useSelector } from "react-redux";
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
        case "/Chat":
          return <ChatIcon />;
        case "/Translate":
          return <TranslateIcon />;
        case "/GrammarCheck":
          return <GrammarCheckIcon />;
        default:
          return <EverythingIcon isDarkMode={isDarkMode} />;
      }
    },
    [isDarkMode]
  );

  const dynamicIcon = useMemo(() => setIcon(location.pathname), [location.pathname, setIcon]);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const listItems = useMemo(() => [
    {
      id: 1,
      title: location.pathname.slice(1),
      path: location.pathname === "/" ? "Home" : location.pathname === "/Profile" ? "Profile" : location.pathname,
    },
    {
      id: 2,
      title: "Home",
      path: "/",
      ico: <HomeIcon isDarkMode={isDarkMode} />,
    },
    {
      id: 4,
      title: "Profile",
      path: "/Profile",
      ico: <ProfileIcon />,
    },
  ], [location.pathname, isDarkMode]);

  return (
    <div
      id="container"
      className={`fixed backdrop-blur-lg border-t bottom-0 w-screen h-fit flex items-center justify-center montserrat ${isDarkMode
        ? "bg-foreground/60 lg:bg-foreground border-border text-copy"
        : "bg-foregroundLight border-borderLight text-copyLight"
        } transition-all duration-300 z-30`}
    >
      <ul
        className={`flex justify-between items-center px-5 pt-2 gap-1 w-screen lg:w-3/4 backdrop-blur transform-gpu ${isDarkMode ? "bg-lightBg2/10" : "bg-bg3/10"}`}
      >
        {listItems.map((listItem) => (
          <m.li
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
                className={`h-7 w-7 lg:size-8 ${selected !== listItem.path
                  ? "translate-y-1"
                  : "scale-110"
                  } hover:scale-105 transition-all duration-300 ease-in-out ${listItem.id === 1 ? "transition-colors" : ""} ${listItem.title === "Chat" ? "translate-x-1" : ""}`}
              >
                {listItem.id === 1 ? dynamicIcon : listItem.ico}
              </span>
              <h1
                className={`mb-1 tracking-tightest ${selected === listItem.path ? "translate-y-0" : "translate-y-10"} transition-all ease-in-out duration-700 ${isDarkMode ? "text-copy" : "text-copyLight"}`}
              >
                {listItem.id !== 1 && (listItem.title === "Home" || listItem.title === "Profile") ? listItem.title : null}
                {listItem.id === 1 && listItem.path === location.pathname && listItem.title !== "Profile" ? `${listItem.title}` : null}
              </h1>
              <AnimatePresence>
                {selected === listItem.path && (
                  <m.div
                    layout
                    key="underline"
                    layoutId="underline"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`absolute bottom-0 w-20 h-1 rounded-full ${isDarkMode
                      ? "bg-gradient-to-r from-copy to-copy-light shadow-[0px_-5px_30px_#ffffff]"
                      : "bg-copyLight shadow-[0px_-5px_20px_#252329]"
                      } transition-opacity duration-500 transform-gpu`}
                  />
                )}
              </AnimatePresence>
            </Link>
          </m.li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
