import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlobalHistory from "../components/GlobalHistory";

export default function HomePage() {
  const gridItems = [
    {
      id: 1,
      title: "Grammar Check",
      content: "grammarCheckContent",
      path: "/grammarcheck",
      classes: "bg-gradient-to-br from-yellow-400 to-orange-500 col-span-2",
    },
    {
      id: 2,
      title: "Translate",
      content: "translateContent",
      path: "/translate",
      classes: "bg-gradient-to-br from-green-400 to-teal-500",
    },
    {
      id: 3,
      title: "Chat",
      content: "chatContent",
      path: "/chat",
      classes: "bg-gradient-to-br from-blue-500 to-purple-600 w-full",
    },
  ];

  return (
    <motion.section className="w-screen h-screen relative overflow-x-hidden px-1 flex flex-col items-center">
      <div
        id="optionsContainer"
        className="w-full h-3/5 laptop:px-20 laptop:py-5 desktop:px-20 smartphone:px-3 smartphone:py-5  grid grid-cols-2 gap-2"
      >
        {gridItems.map((gridItem) => (
          <Link
            key={gridItem.id}
            to={gridItem.path}
            className={`w-full h-full rounded-xl ${gridItem.classes}`}
          >
            <div to={gridItem.path} className={`w-full h-full text-center`}>
              {gridItem.title}
            </div>
          </Link>
        ))}
      </div>
      <GlobalHistory />
    </motion.section>
  );
}
