import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const gridItems = [
    {
      id: 1,
      title: "Grammar Check",
      content: "grammarCheckContent",
      path: "/grammarcheck",
      classes: "bg-yellow-500 col-span-2",
    },
    {
      id: 2,
      title: "Translate",
      content: "translateContent",
      path: "/translate",
      classes: "bg-green-500",
    },
    {
      id: 3,
      title: "Chat",
      content: "chatContent",
      path: "/chat",
      classes: "bg-blue-500 w-full",
    },
  ];

  return (
    <motion.section className="w-screen h-screen px-2 flex flex-col">
      <div
        id="optionsContainer"
        className="w-full laptop:px-20 laptop:py-5 desktop:px-20 smartphone:px-5 smartphone:py-10 h-1/2 bg-blue-400 grid grid-cols-2 gap-4"
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
      <div id="recentContainer" className="w-full ">
        Recent Container Content
      </div>
    </motion.section>
  );
}
