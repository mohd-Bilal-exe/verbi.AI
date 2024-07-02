import { Link } from "react-router-dom";
import { m } from "framer-motion";
import GlobalHistory from "../components/GlobalHistory";

export default function HomePage() {
  const gridItems = [
    {
      id: 1,
      title: "Grammar Check",
      content: "grammarCheckContent",
      path: "/grammarcheck",
      linkClasses: "col-span-2",
      classes: "bg-gradient-to-br from-yellow-400 to-orange-500 ",
    },
    {
      id: 2,
      title: "Translate",
      content: "translateContent",
      path: "/translate",
      linkClasses: "",
      classes: "bg-gradient-to-br from-green-400 to-teal-500",
    },
    {
      id: 3,
      title: "Chat",
      content: "chatContent",
      path: "/chat",
      linkClasses: "",
      classes: "bg-gradient-to-br from-blue-500 to-purple-600 w-full",
    },
  ];
  const parentVariants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.6, type: "spring" },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", ease: "easeInOut" },
    },
  };
  return (
    <m.section
      variants={parentVariants}
      initial="initial"
      animate="animate"
      className="w-screen h-screen relative overflow-x-hidden px-1 flex flex-col items-center"
    >
      <div
        id="optionsContainer"
        className="w-full h-3/5 laptop:px-20 laptop:py-5 desktop:px-20 smartphone:px-3 smartphone:py-5  grid grid-cols-2 gap-2"
      >
        {gridItems.map((gridItem) => (
          <Link
            key={gridItem.id}
            to={gridItem.path}
            className={`w-full h-full ${gridItem.linkClasses} `}
          >
            <m.div
              variants={fadeInUpVariants}
              to={gridItem.path}
              className={`w-full h-full text-center rounded-xl  ${gridItem.classes}`}
            >
              {gridItem.title}
            </m.div>
          </Link>
        ))}
      </div>
      <GlobalHistory />
    </m.section>
  );
}
