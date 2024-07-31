import { useSelector } from "react-redux";

export default function TopNav() {
  const isDarkMode = useSelector((state) => state.darkMode);
  return (
    <nav
      className={`w-screen h-16 py-1 lg:mb-4 border-b flex justify-center items-center bg-transparent  ${isDarkMode
        ? "text-copy  border-border/20 "
        : "text-copyLight border-borderLight/20 "
        } `}
    >
      <a href="/">
        <h1
          className={`borel h-fit text-center -mb-9  text-4xl font-bold drop-shadow-2xl `}
        >
          verbi.
          <span
            className={` bg-gradient-to-tr  ${isDarkMode
              ? "from-blue-300 from-30% via-purple-300 to-red-400"
              : "from-blue-500 from-10% via-purple-500 to-red-500"
              } transition-all duration-700 text-transparent bg-clip-text `}
          >
            AI
          </span>
        </h1>
      </a>
    </nav>
  );
}
