import { Link } from "react-router-dom";
import { m } from "framer-motion";
import GlobalHistory from "../components/GlobalHistory";
import { useSelector } from "react-redux";
import { ArrowCircleRight } from "@phosphor-icons/react";

export default function HomePage() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const gridItems = [
    {
      id: 1,
      title: "Grammar Check",
      content: "Fine-tune your sentences with precision. ",
      path: "/grammarcheck",
      linkClasses: "col-span-2",
      imgSrc: "/grammar1.png",
      imgClass:
        " w-40 h-40 smartphone:size-48 my-auto  self-end drop-shadow-2xl",
      classes: `bg-gradient-to-br  ${
        isDarkMode
          ? "from-yellow-400 to-orange-500"
          : "from-yellow-200 to-orange-300"
      }`,
    },
    {
      id: 2,
      title: "Translate",
      content: "Transalte to any language with ease. ",
      path: "/translate",
      linkClasses: "",
      imgSrc: "/tra.png",
      imgClass:
        " w-24 h-24 my-auto mr-4 smartphone:mb-4 self-end drop-shadow-2xl",
      classes: `bg-gradient-to-br  ${
        isDarkMode ? "from-green-400 to-teal-500" : "from-green-300 to-teal-400"
      }`,
    },
    {
      id: 3,
      title: "Chat",
      content: "Have a conversations with Gemini. ✨",
      path: "/chat",
      linkClasses: "",
      imgSrc: "/chat.png",
      imgClass: " w-32 h-32 my-auto self-end drop-shadow-2xl ",
      classes: `bg-gradient-to-br ${
        isDarkMode ? "from-accent2 to-accent2lt" : "from-blue-400 to-accent2lt"
      }`,
    },
  ];

  const parentVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <m.section className="w-screen h-screen relative overflow-x-hidden px-1 smartphone:pt-14 flex flex-col items-center">
      <m.div
        variants={parentVariants}
        initial="initial"
        animate="animate"
        id="optionsContainer"
        className="w-full h-3/5 laptop:px-20 laptop:py-5 desktop:px-20 smartphone:px-3 smartphone:py-5  grid grid-cols-2 gap-2 transform-gpu"
      >
        {gridItems.map((gridItem) => (
          <Link
            key={gridItem.id}
            to={gridItem.path}
            className={`relative w-full h-full ${gridItem.linkClasses} `}
          >
            <m.div
              to={gridItem.path}
              className={`group w-full h-full flex flex-row justify-between rounded-xl  ${gridItem.classes}`}
            >
              <div
                id="texts"
                className={`w-fit flex flex-col text-2xl mt-10 drop-shadow-xl`}
              >
                <h1
                  className={`group-hover:translate-x-2 transition-transform duration-300 ml-5 montserrat tracking-wider font-medium transform-gpu`}
                >
                  {gridItem.title}
                </h1>
                <h2
                  className={`open-sans font-medium  flex items-center smartphone:items-start smartphone:flex-col ml-6 w-fit smartphone:w-3/5 text-sm group-hover:translate-x-5 transition-transform duration-300 transform-gpu`}
                >
                  {gridItem.content}
                  <ArrowCircleRight
                    className={`group-hover:-rotate-45 group-hover:translate-x-4 group-hover:scale-125 h-7 w-7 transition-transform duration-300 transform-gpu`}
                    weight="duotone"
                  />
                </h2>
              </div>
              <div
                id="illustration"
                className={`flex smartphone:absolute bottom-0 right-1 group-hover:scale-110 transition-all duration-300`}
              >
                <img
                  className={gridItem.imgClass}
                  src={gridItem.imgSrc}
                  loading="lazy"
                />
              </div>
            </m.div>
          </Link>
        ))}
      </m.div>
      <GlobalHistory />
    </m.section>
  );
}
