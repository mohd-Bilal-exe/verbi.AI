import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../Redux/Actions";
import DropDown from "./DropDown";

const handleClick = (dispatch, key, update) => {
  dispatch(changeUser(key, update));
};

const Name = ({ type, name, setName }) => {
  return (
    <div
      key={"gemma3"}
      className="group w-full h-full px-6 flex flex-row justify-center"
    >
      <div className={`w-full h-full flex flex-col justify-center`}>
        <div className="w-full flex flex-col justify-center gap-1 mt-10 mb-3 text-copy">
          <h1 className="text-2xl smartphone:text-3xl font-bold ">
            Ready for a {type === "username" ? "name" : "nickname"} Makeover?
          </h1>
          <h2 className="text-sm smartphone:text-sm  ml-1 tracking-tight text-white">
            Let&apos;s give you a new identity!
          </h2>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-1/2 bg-transparent p-2 outline-none border-b text-copy`}
        />
      </div>
    </div>
  );
};

Name.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

const About = ({ about, setAbout }) => {
  return (
    <div
      key={"gemma3"}
      className="group w-full h-full px-6 flex flex-col justify-center"
    >
      <div className="w-full flex flex-col gap-1 mt-10 mb-3 text-copy">
        <h1 className="text-2xl smartphone:text-3xl font-bold ">
          Ready to spill the beans?
        </h1>
        <h2 className="text-sm smartphone:text-sm ml-1 tracking-tight text-white">
          Alright, let&apos;s hear your story {"(yes, again)"}.
        </h2>
      </div>
      <textarea
        type="text"
        onChange={(e) => setAbout(e.target.value)}
        placeholder={about}
        className={`w-1/2 bg-transparent p-2 outline-none border-b placeholder:text-sm placeholder:text-copy-light text-white`}
      />
    </div>
  );
};

About.propTypes = {
  about: PropTypes.string.isRequired,
  setAbout: PropTypes.func.isRequired,
};

const Tone = ({ type, update }) => {
  return (
    <div className={`w-full h-full grid place-content-center`}>
      <DropDown title={type} setSelected={update} place="editModal" />{" "}
    </div>
  );
};

Tone.propTypes = {
  type: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

const Avatar = ({ avatar, update }) => {
  const emojis = useMemo(
    () => [
      "😊",
      "😀",
      "😎",
      "😒",
      "😘",
      "😜",
      "😄",
      "😁",
      "😂",
      "😢",
      "😡",
      "🤔",
      "🤗",
      "😷",
      "🤠",
      "😇",
      "🤓",
      "😈",
      "🤖",
      "🦄",
      "🐱",
      "🐶",
      "🐼",
      "🐨",
    ],
    []
  );
  return (
    <div
      key={"avatar"}
      className="group w-full h-full px-6 flex flex-col justify-center text-white"
    >
      <h2 className="text-sm smartphone:text-xs group-hover:translate-x-1 transition-all tracking-tighter mb-6">
        Choose you new avatar.
      </h2>
      <div
        className={`w-full h-32 grid grid-cols-8 smartphone:grid-cols-6  bg-black/20 p-2 overflow-y-auto rounded-2xl text-4xl `}
      >
        {emojis.map((emoji, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                update(emojis[index]);
              }}
              className={`smartphone:focus:backdrop-brightness-150 hover:backdrop-brightness-150 hover:scale-110 ${
                avatar === emojis[index] && "backdrop-brightness-150"
              }  p-1 rounded-xl transition-all cursor-pointer`}
            >
              {emoji}
            </span>
          );
        })}
      </div>
    </div>
  );
};
Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};
export default function EditModal({ attributes, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const isDarkMode = useSelector((state) => state.darkMode);
  const [name, setName] = useState(user.username);
  const [nickname, setNickname] = useState(user.nickname);
  const [about, setAbout] = useState(user.about);
  const [tone, setTone] = useState(user.tone);
  const [nature, setNature] = useState(user.nature);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = () => {
    if (attributes === "username") {
      handleClick(dispatch, attributes, name);
    } else if (attributes === "nickname") {
      handleClick(dispatch, attributes, nickname);
    } else if (attributes === "about") {
      handleClick(dispatch, attributes, about);
    } else if (attributes === "tone") {
      handleClick(dispatch, attributes, tone);
    } else if (attributes === "nature") {
      handleClick(dispatch, attributes, nature);
    } else if (attributes === "avatar") {
      handleClick(dispatch, attributes, avatar);
    }
    onClose();
  };

  return (
    <section className="absolute z-50 top-0 left-0 w-screen h-screen backdrop-blur-lg backdrop-brightness-50 flex justify-center items-center">
      <div
        className={`relative rounded-lg ${
          attributes === "tone" || attributes === "nature"
            ? "w-2/5 pt-5"
            : " w-1/2 h-[422px] smartphone:w-11/12 overflow-hidden"
        }    flex flex-col bg-gradient-to-br ${
          isDarkMode
            ? "from-foregroundLight/20 to-foregroundLight/30  text-copyLight"
            : "from-foreground/30 to-foreground/20 text-copyLight"
        }`}
      >
        {attributes === "username" && (
          <Name type={attributes} name={name} setName={setName} />
        )}
        {attributes === "nickname" && (
          <Name type={attributes} name={nickname} setName={setNickname} />
        )}
        {attributes === "about" && <About about={about} setAbout={setAbout} />}
        {attributes === "tone" && <Tone type="tone" update={setTone} />}
        {attributes === "nature" && <Tone type="nature" update={setNature} />}
        {attributes === "avatar" && (
          <Avatar avatar={avatar} update={setAvatar} />
        )}

        <button
          onClick={handleSave}
          className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Save and Close
        </button>
      </div>
    </section>
  );
}

EditModal.propTypes = {
  attributes: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
