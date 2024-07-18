import { useSelector } from "react-redux";
import { m } from "framer-motion";
export default function WelcomeScreen() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const words = ["Translate.", "Check.", "Chat."];
  return (
    <m.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`w-screen h-screen absolute top-0 left-0 backdrop-blur-xl grid place-content-center  z-50 ${
        isDarkMode ? "bg-background text-copy" : "bg-backgroundLight"
      } `}
    >
      <div className="w-full h-32 smartphone:h-28 mb-10 smartphone:mb-24 flex  flex-col justify-end items-center overflow-hidden">
        <div className="relative w-fit h-fit ">
          <h1 className="borel text-5xl font-bold">
            <m.span
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 1 }}
              className={`h-full w-fit z-10 ${
                isDarkMode ? "bg-background text-copy" : "bg-backgroundLight"
              }`}
            >
              verbi
            </m.span>
            <m.span
              className="inline-block z-50"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.65 }}
            >
              .AI
            </m.span>
          </h1>
        </div>
        <div className="flex items-center justify-center z-50 mt-0 ml-2 space-x-1">
          {words.map((word, index) => (
            <m.h5
              key={word}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 1.15 + index * 0.25,
              }}
              className={`${
                isDarkMode
                  ? "bg-background text-copy"
                  : "bg-backgroundLight text-copyLight"
              }`}
            >
              {word}
            </m.h5>
          ))}
        </div>
      </div>
      <div
        id="text2"
        className={`absolute bottom-1 smartphone:bottom-16  w-full h-2/6 flex   justify-center items-end text-xs `}
      >
        <span className={`flex justify-center items-end pb-1 h-7 open-sans`}>
          Powered by
        </span>
        <span
          className={`montserrat tracking-wide  h-7 mx-1 font-semibold text-xl bg-gradient-to-tr  ${
            isDarkMode
              ? "from-blue-300 from-10% via-purple-300 to-red-400"
              : "from-blue-500 from-10% via-purple-500 to-red-500"
          } transition-all duration-700 text-transparent bg-clip-text `}
        >
          Gemini.
        </span>
      </div>
    </m.div>
  );
}
