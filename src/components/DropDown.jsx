import PropTypes from "prop-types";
import { CaretDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";

const DropDown = ({ setSelected, title }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(title);
  const Lists =
    title === "tone"
      ? [
          { code: "professional", name: "💼 Professional " },
          { code: "casual", name: "😊 Casual " },
          { code: "formal", name: "🎩 Formal " },
          { code: "friendly", name: "😄 Friendly " },
        ]
      : [
          { code: "funny", name: "😄 Funny " },
          { code: "sarcastic", name: "😏 Sarcastic " },
          { code: "witty", name: "😄 Witty " },
          { code: "humorous", name: "😆 Humorous " },
        ];

  return (
    <div className="w-fit h-fit">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          type="button" // Set type to "button" to prevent form submission
          onClick={() => setOpen((pv) => !pv)}
          className="w-36 flex items-center justify-between gap-2 smartphone:gap-1 opacity-45 hover:opacity-100 transition-all px-3 py-2 rounded-lg text-indigo-50 bg-indigo-500 hover:bg-indigo-600"
        >
          <span className="font-medium text-xs">{message}</span>
          <motion.span variants={iconVariants}>
            <CaretDown size={15} weight="duotone" />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-1 p-1.5 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-36 overflow-hidden"
        >
          {Lists.map((item) => (
            <Option
              key={item.code}
              setOpen={setOpen}
              setSelected={setSelected}
              setMessage={setMessage}
              text={item.name}
              code={item.code}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, code, setSelected, setMessage, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSelected(code);
        setMessage(text);
        setOpen(false);
      }}
      className="flex items-center gap-2 w-full text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

DropDown.propTypes = {
  setSelected: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.02,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};
