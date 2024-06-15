import { Link } from "react-router-dom";
import { Translate, Chat, BookOpenUser, User } from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const listItems = [
  {
    id: 1,
    title: "Chat",
    ico: <Chat className="icon" size={"100%"}  weight="duotone" />,
    path: "/chat",
  },
  {
    id: 2,
    title: "Translator",
    ico: <Translate className="icon" size={"100%"}  weight="duotone" />,
    path: "/",
  },
  {
    id: 3,
    title: "Grammar check",
    ico: <BookOpenUser className="icon" size={"100%"}  weight="duotone" />,
    path: "/grammarcheck",
  },
  {
    id: 4,
    title: "Profile",
    ico: <User className="icon" size={"100%"}  weight="duotone" />,
    path: "/profile",
  },
];

export default function Navbar() {
  const isDarkMode = useSelector(state => state.darkMode);
  const [selected, setSelected] = useState(location.pathname); // Assuming initial selection

  return (
    <div
      id="container"
      className={`fixed bottom-0 w-screen h-fit flex items-center justify-center montserrat ${isDarkMode ? " text-white" : "bg-bg3/10 text-bg1"}`}
    >
      <ul className={`flex justify-between items-center px-5 pt-2 gap-1 w-screen desktop:w-3/4 backdrop-blur ${isDarkMode ? " bg-lightBg2/10" : "bg-bg3/10"}  `}>
        {listItems.map((listItem) => (
          <li
            key={listItem.id}
            className="group w-1/4 flex justify-center items-center"
          >
            <Link
              to={listItem.path}
              className={`w-full text-xs flex flex-col justify-center items-center  `}
              onClick={() => setSelected(listItem.path)}
            >
              <span className={`h-7 w-7 ${selected !== listItem.path ? "translate-y-1" : isDarkMode ? "text-DarkAccentBluedk " : "text-LightAccentBluelt/60"} hover:scale-105 transition-all duration-300`}>
                {listItem.ico}
              </span>
              <h1
                className={` mb-1 tracking-tightest ${selected === listItem.path ? "translate-y-0" : "translate-y-10"} transition-all ease-in-out duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
              >
                {listItem.title}
              </h1>
              {selected === listItem.path && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    duration: 0.5
                  }}
                  className={`absolute bottom-0 w-20 h-1 rounded-full opacity-75 ${isDarkMode ? 'bg-gradient-to-r from-DarkAccentBluelt to-DarkAccentBluedk' : 'bg-gradient-to-r from-LightAccentBluelt/60 to-LightAccentBluedk/60'} transition-opacity duration-300`}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
