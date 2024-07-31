import { Link } from "react-router-dom";
import { m } from "framer-motion";
import GlobalHistory from "../components/GlobalHistory";
import { useSelector } from "react-redux";
import { ArrowCircleRight } from "@phosphor-icons/react";
import TopNav from "../components/TopNav";
import { ChatIcon2, GrammarCheckIcon, TranslateIcon } from "../components/SvgIcons";

export default function HomePage() {
  const isDarkMode = useSelector((state) => state.darkMode);

  const gridItems = [
    {
      id: 1,
      title: "Grammar Check",
      content: "Fine-tune your sentences with precision.",
      path: "/grammarcheck",
      linkClasses: "col-span-2",
      icon: <GrammarCheckIcon />,
      classes: `bg-gradient-to-br shadow-2xl ${isDarkMode
        ? "from-yellow-400 to-orange-500 shadow-orange-500/20 lg:shadow-orange-500/10"
        : "from-yellow-200 to-orange-300 shadow-orange-300/20 lg:shadow-orange-300/10"
        }`,
    },
    {
      id: 2,
      title: "Translate",
      content: "Translate to any language with ease.",
      path: "/translate",
      linkClasses: "smartphone:col-span-2",
      icon: <TranslateIcon />,
      classes: `bg-gradient-to-br shadow-2xl ${isDarkMode
        ? "from-green-400 to-teal-500 shadow-teal-500/50 lg:shadow-teal-500/10"
        : "from-green-300 to-teal-400 shadow-teal-400/50 lg:shadow-teal-400/10"
        }`,
    },
    {
      id: 3,
      title: "Chat",
      content: "Have conversations with Gemini.✨",
      path: "/chat",
      linkClasses: "smartphone:col-span-2",
      icon: <ChatIcon2 />,
      classes: `bg-gradient-to-br shadow-2xl ${isDarkMode
        ? "from-accent2 to-accent2lt shadow-accent2lt/50 lg:shadow-accent2lt/10"
        : "from-blue-400 to-accent2lt shadow-accent2lt/50 lg:shadow-accent2lt/10"
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
    <m.section className="w-screen h-screen transform-gpu relative overflow-hidden px-1  flex flex-col items-center">
      <TopNav />
      <m.div
        variants={parentVariants}
        initial="initial"
        animate="animate"
        id="optionsContainer"
        className="w-11/12 smartphone:w-full h-3/5 lg:px-20 lg:pb-6  smartphone:px-3 smartphone:py-5 grid grid-cols-2 gap-2 transform-gpu"
      >
        {gridItems.map((gridItem) => (
          <Link
            key={gridItem.id}
            to={gridItem.path}
            className={`relative w-full h-full ${gridItem.linkClasses}`}
          >
            <div
              className={`group w-full h-full flex flex-row justify-between items-center rounded-xl hover:rounded-md transition-all transform-gpu ${gridItem.classes}`}
            >
              <div className="w-4/5  h-full flex flex-col justify-center gap-1 drop-shadow-xl overflow-hidden">
                <h1 className="lg:text-3xl text-2xl  group-hover:translate-x-2 transition-transform duration-300 ml-5 montserrat tracking-wider font-medium transform-gpu">
                  {gridItem.title}
                </h1>
                <h2 className="open-sans  flex gap-1 items-center ml-8 w-fit smartphone:w-4/5 text-xs lg:text-sm tracking-wide  group-hover:translate-x-5 smartphone:group-hover:translate-x-1 transition-transform duration-300 transform-gpu">
                  {gridItem.content}
                  <ArrowCircleRight
                    className="group-hover:-rotate-45 smartphone:group-hover:rotate-0 group-hover:translate-x-2 group-hover:scale-110 h-7 w-7 transition-transform duration-300 transform-gpu"
                    weight="duotone"
                  />
                </h2>
              </div>
              <div className={`flex justify-end  absolute pr-3 b g-white  h-2/5 w-1/5  bottom-10 right-0 group-hover:scale-110 transition-all duration-300 `}>
                {gridItem.icon}
              </div>
            </div>
          </Link>
        ))}
      </m.div>
      <GlobalHistory />
    </m.section>
  );
}
