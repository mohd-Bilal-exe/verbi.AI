import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { rememberMe } from "../Api/aiApi";
import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { StyleDropDown } from "../components/Dropdowns";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tone, setTone] = useState("");
  const [nature, setNature] = useState("");
  const [errors, setErrors] = useState({});
  const id = useMemo(() => uuidv4(), []); // To ensure id remains the same
  const [position, setPosition] = useState(0);
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };
  const validateStep = useCallback(() => {
    const newErrors = { ...errors };
    if (currentStep === 0) {
      if (!username) newErrors.username = "Name is required";
      else delete newErrors.username; // Clear error if field is valid
    }
    if (currentStep === 1) {
      if (!nickname) newErrors.nickname = "Nickname is required";
      else delete newErrors.nickname;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, username, nickname, errors]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateStep()) {
        dispatch(addUser(id, username, nickname, about, avatar, tone, nature));
        rememberMe(id, username, nickname, about, tone, nature);
        navigate("/Profile");
      }
    },
    [
      validateStep,
      dispatch,
      id,
      username,
      nickname,
      about,
      avatar,
      tone,
      nature,
      navigate,
    ]
  );
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

  const steps = useMemo(
    () => [
      {
        id: "username",
        component: (
          <div
            key={"gemma3"}
            className="group w-full h-full px-6 flex flex-col justify-center"
          >
            <div className="w-full flex flex-col gap-1 mb-6 text-copy">
              <h1 className="text-4xl smartphone:text-3xl font-bold ">
                Hey there! I&apos;m{" "}
                <m.span
                  key={"gemma"}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="overflow-hidden bg-gradient-to-br from-blue-300 from-10% via-purple-300 to-red-300 transition-all duration-700 text-transparent bg-clip-text"
                >
                  Gemini
                </m.span>
                {username && (
                  <m.span
                    key="hiiemojis"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl smartphone:text-2xl"
                  >
                    👋
                  </m.span>
                )}
              </h1>
              <h2 className="text-lg smartphone:text-sm  ml-1 tracking-tight text-white">
                Let&apos;s kick things off! Tell me a bit about yourself. 🕵️‍♂️
              </h2>
              <h3 className="text-sm smartphone:text-xs  ml-1 group-hover:translate-x-1 transition-all tracking-tighter">
                What&apos;s your name? Let&apos;s start there. 📝
              </h3>
            </div>
            <input
              type="text"
              required
              value={username}
              placeholder="Start typing your name..."
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
              }}
              className={`w-fit bg-transparent p-2 outline-none border-b ${
                errors.username ? "border-red-400 " : "border-white"
              }  placeholder:text-white placeholder:text-sm text-white`}
            />
            {errors.username && (
              <span className="text-red-400 text-sm w-fit ">
                {errors.username}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "nickname",
        component: (
          <div
            key={"sweet"}
            className="group w-full h-full px-6 flex flex-col justify-center transition-all text-white"
          >
            <div>
              <m.h1
                key={"sweet2"}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold"
              >
                Sweet!{" "}
              </m.h1>
              <h1 className="text-2xl font-bold ">
                Nice to{" "}
                <span className="bg-gradient-to-br from-orange-300 from-10% via-orange-400 to-orange-600 transition-all duration-700 text-transparent bg-clip-text">
                  &quot;meet&quot;
                </span>{" "}
                you, {username}. 😊
              </h1>
              <h2 className="text-sm smartphone:text-xs group-hover:translate-x-1 transition-all tracking-tighter mb-6">
                So, what nickname should I use for you? 🤔
              </h2>
            </div>

            <input
              type="text"
              value={nickname}
              placeholder="Type your nickname here..."
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setNickname(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, nickname: "" }));
              }}
              className={`w-fit bg-transparent p-2 outline-none border-b ${
                errors.nickname ? "border-red-400 " : "border-white"
              }  placeholder:text-white placeholder:text-sm text-white`}
            />
            {errors.nickname && (
              <span className="text-red-500 text-sm transition-all">
                {errors.nickname}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "avatar",
        component: (
          <div
            key={"avatar"}
            className="group w-full h-full px-6 flex flex-col justify-center text-white"
          >
            <m.h1
              key={"avatar1"}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text`}
            >
              Let&apos;s gowwwwwwww!
            </m.h1>
            <h1 className="text-2xl font-bold ">
              Okay, so {nickname}. {avatar}
            </h1>
            <h2 className="text-sm smartphone:text-xs group-hover:translate-x-1 transition-all tracking-tighter mb-6">
              Choose an avatar 🚀
            </h2>
            <div
              className={`w-full h-32 grid grid-cols-8 smartphone:grid-cols-6  bg-black/20 p-2 overflow-y-auto rounded-2xl text-4xl scrollbar-thumb-rounded`}
            >
              {emojis.map((emoji, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      setAvatar(emojis[index]);
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
        ),
      },

      {
        id: "about",
        component: (
          <div
            key={"awsm"}
            className="group w-full h-full px-6 flex flex-col justify-center text-white"
          >
            <m.h1
              key={"awsm4"}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text`}
            >
              Awesome!{" "}
            </m.h1>
            <h1 className="text-2xl font-bold ">
              I&apos;ll call you {nickname}. 🎉
            </h1>
            <h2 className="text-sm smartphone:text-xs group-hover:translate-x-1 transition-all tracking-tighter mb-6">
              Now, tell me all about yourself. Don&apos;t hold back! 🚀
            </h2>
            <textarea
              value={about}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              placeholder={
                "Tell me stuff about you like what you do,\nyour hobbies, dreams, favorite ice cream flavor... you know, the usual!🍦"
              }
              className="w-full  resize-none bg-transparent p-2 outline-none border-b border-white placeholder:text-white placeholder:text-xs placeholder:pt-1 smartphone:placeholder:pt-1  text-white"
            />
          </div>
        ),
      },
      {
        id: "Miscellaneous",
        component: (
          <div
            key={"misc"}
            className="w-full h-full px-6 flex flex-col justify-center text-white group "
          >
            <div className="w-full text-white">
              <h1 className="text-xl font-bold text-white">
                Last step, {nickname}! 🏁
              </h1>
              <h2 className="text-sm smartphone:text-xs group-hover:translate-x-1 transition-all tracking-tighter mb-4">
                Pick what you want to customize next. 🎨
              </h2>
            </div>
            <div className="w-full flex gap-2 items-center justify-center text-white">
              <StyleDropDown setSelected={setTone} title={"Tone"} />
              <StyleDropDown setSelected={setNature} title={"Nature"} />
            </div>
          </div>
        ),
      },
    ],
    [username, nickname, about, errors, emojis, avatar]
  );
  const sidebar = useMemo(
    () => (
      <div
        className={`absolute right-1 w-2 h-full flex flex-col justify-center gap-1`}
      >
        {[0, 1, 2, 3, 4].map((step, index) => (
          <m.div
            key={index}
            layout
            className={`w-1 h-1 mx-auto rounded-full transition-all ease-in-out ${
              currentStep === step ? "my-1 " : ""
            }`}
            animate={{
              scale: currentStep === step ? 1.8 : 1,
              backgroundColor: currentStep === step ? "#F0F0F0" : "#CCCCCC",
            }}
          />
        ))}
      </div>
    ),
    [currentStep]
  );
  const handleNext = useCallback(() => {
    if (validateStep()) {
      setPosition(position - 422);
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, validateStep, position]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setPosition(position + 422);
    }
  }, [currentStep, position]);
  return (
    <m.section
      key={"LoginPage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen absolute top-0 left-0 z-50 backdrop-blur-lg flex justify-center items-center p-3 smartphone:pb-24 bg-background `}
    >
      <div
        className={`relative rounded-lg w-1/2 h-[422px] smartphone:w-full  overflow-hidden flex bg-gradient-to-br ${
          isDarkMode
            ? "from-foregroundLight/20 to-foregroundLight/30  text-copyLight"
            : "from-foreground/30 to-foreground/20 text-copyLight"
        } `}
      >
        <m.div
          initial={{ y: 0 }}
          animate={{ y: position }}
          transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
          className={`w-full h-full transform-gpu`}
        >
          {steps.map((step) => {
            return step.component;
          })}
        </m.div>

        {sidebar}
        <div
          id="buttons"
          className={`absolute bottom-0 w-full h-fit flex justify-between p-4`}
        >
          <button
            onClick={handlePrev}
            key="prev"
            className="group p-1 bg-copy text-copyLight rounded-full disabled:opacity-50"
            disabled={currentStep === 0}
          >
            <ArrowCircleLeft
              className="transition-all duration-100 group-hover:rotate-90 smartphone:group-focus:text-blue-500 group-hover:text-blue-500"
              size={32}
              weight="duotone"
            />
          </button>

          <button
            onClick={currentStep === steps.length - 1 ? onSubmit : handleNext}
            className="group p-1 bg-copy text-copyLight rounded-full"
          >
            {currentStep === steps.length - 1 ? (
              <CheckCircle
                className="transition-all duration-100 group-hover:text-green-500"
                size={32}
                weight="duotone"
              />
            ) : (
              <ArrowCircleRight
                className="transition-all duration-100 group-hover:rotate-90 group-hover:text-blue-500"
                size={32}
                weight="duotone"
              />
            )}
          </button>
        </div>
      </div>
    </m.section>
  );
}
