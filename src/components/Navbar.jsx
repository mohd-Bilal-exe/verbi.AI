import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const listItems = [
  {
    id: 1,
    title: "Chat",
    ico: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 24"
        strokeWidth={1.7}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
    path: "/chat",
  },
  {
    id: 2,
    title: "Translator",
    ico: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 24"
        strokeWidth={1.7}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
        />
      </svg>
    ),
    path: "/",
  },
  {
    id: 3,
    title: "Grammar check",
    ico: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 24"
        strokeWidth={1.7}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    path: "/grammarcheck",
  },
  {
    id: 4,
    title: "Profile",
    ico: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 24"
        strokeWidth={1.7}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    path: "/profile",
  },
];

export default function Navbar() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [selected, setSelected] = useState(location.pathname); 

  return (
    <div
      id="container"
      className={`fixed bottom-0 w-screen h-fit flex items-center justify-center montserrat ${
        isDarkMode ? " text-white" : "bg-bg3/10 text-bg1"
      }`}
    >
      <ul
        className={`flex justify-between items-center px-5 pt-2 gap-1 w-screen desktop:w-3/4 backdrop-blur ${
          isDarkMode ? " bg-lightBg2/10" : "bg-bg3/10"
        }  `}
      >
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
              <span
                className={`h-7 w-7 ${
                  selected !== listItem.path
                    ? "translate-y-1 "
                    : isDarkMode
                    ? "text-DarkAccentBluedk scale-110"
                    : "text-LightAccentBluelt/60 scale-110"
                } hover:scale-105 transition-all ease-in-out duration-500`}
              >
                {listItem.ico}
              </span>
              <h1
                className={` mb-1 tracking-tightest ${
                  selected === listItem.path
                    ? "translate-y-0"
                    : "translate-y-10"
                } transition-all ease-in-out duration-500 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {listItem.title}
              </h1>
              {selected === listItem.path && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    duration: 0.5,
                  }}
                  className={`absolute bottom-0 w-20 h-1 rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-r from-DarkAccentBluelt to-DarkAccentBluedk shadow-[0px_-5px_25px_#4cc9f0] laptop:shadow-[0px_-2px_30px_#4cc9f0]"
                      : "bg-gradient-to-r from-LightAccentBluelt/60 to-LightAccentBluedk/60 shadow-[0px_-5px_25px_#3f37c9]"
                  } transition-opacity duration-500`}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
