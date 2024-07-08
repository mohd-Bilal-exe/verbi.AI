import PropTypes from "prop-types";
import { CaretDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";

const DropDown = ({ setSelected, title, place }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(title);

  const Lists =
    place === "editModal"
      ? title === "tone"
        ? [
            { code: "professional", name: "💼 Professional" },
            { code: "casual", name: "😊 Casual" },
            { code: "friendly", name: "😄 Friendly" },
            { code: "informative", name: "🧐 Informative" },
            { code: "formal", name: "🎩 Formal" },
            { code: "respectful", name: "🙏 Respectful" },
            { code: "supportive", name: "🤗 Supportive" },
            { code: "motivational", name: "🚀 Motivational" },
          ]
        : [
            { code: "sarcastic", name: "😏 Sarcastic" },
            { code: "witty", name: "😄 Witty" },
            { code: "thoughtful", name: "🤔 Thoughtful" },
            { code: "creative", name: "🌟 Creative" },
            { code: "humorous", name: "😂 Humorous" },
            { code: "inspirational", name: "🌈 Inspirational" },
            { code: "reflective", name: "🪞 Reflective" },
            { code: "whimsical", name: "🦄 Whimsical" },
          ]
      : title === "tone"
      ? [
          { code: "professional", name: "💼 Professional" },
          { code: "casual", name: "😊 Casual" },
          { code: "friendly", name: "😄 Friendly" },
          { code: "informative", name: "🧐 Informative" },
        ]
      : [
          { code: "sarcastic", name: "😏 Sarcastic" },
          { code: "witty", name: "😄 Witty" },
          { code: "thoughtful", name: "🤔 Thoughtful" },
          { code: "creative", name: "🌟 Creative" },
        ];

  return (
    <div className="w-fit h-fit relative">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          type="button" // Set type to "button" to prevent form submission
          onClick={() => setOpen((pv) => !pv)}
          className="w-32 flex items-center justify-between gap-1 transition-all px-2 py-2 rounded-lg text-copyLight bg-gradient-to-br from-copy to-copy-light"
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
          className={` grid  place-content-center p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] ${
            place === "editModal" ? "w-[320px] grid-cols-3" : "w-48 grid-cols-2"
          }  h-fit`}
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
      className="flex items-center justify-center p-2 w-fit text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

DropDown.propTypes = {
  setSelected: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  place: PropTypes.string,
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
