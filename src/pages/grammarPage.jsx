import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function GrammarPage() {
    const isDarkMode = useSelector(state => state.darkMode);
  //useEffect(()=>{},[])
  return (
    <motion.div
      key={"GrammarPage"}
      initial={{ opacity: 0, }}
      animate={{ opacity: 1,}}
      exit={{ opacity: 0, }}
      className={`"w-screen h-screen flex flex-row smartphone:flex-col ${isDarkMode ? 'bg-bg1 text-white' : 'text-bg1'} `}
    >
      <div className="w-screen h-1/2 text-2xl">1stsec</div>
      <div className="w-screen h-1/2 text-2xl">2ndsec</div>
    </motion.div>
  );
}
