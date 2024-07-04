import { m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { rememberMe } from "../Api/aiApi";
import { useState } from "react";
import DropDown from "../components/DropDown";
import { v4 as uuidv4 } from "uuid";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [tone, setTone] = useState("");
  const [nature, setNature] = useState("");
  const [errors, setErrors] = useState({});
  const id = useState(uuidv4())[0]; // To ensure id remains the same
  const [position, setPosition] = useState(0);
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateStep = () => {
    const newErrors = { ...errors };
    if (currentStep === 0) {
      if (!username) newErrors.username = "Name is required";
      else delete newErrors.username; // Clear error if field is valid
    }
    if (currentStep === 1) {
      if (!nickname) newErrors.nickname = "Nickname is required";
      else delete newErrors.nickname;
    }
    if (currentStep === 2) {
      if (!about) newErrors.about = "About is required";
      else delete newErrors.about;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      dispatch(addUser(id, username, nickname, about, tone, nature));
      rememberMe(id, username, nickname, about, tone, nature);
      navigate("/profile");
    }
  };

  const steps = [
    {
      id: "username",
      component: (
        <div className="group w-full h-full px-6 flex flex-col justify-center">
          <div className="w-full flex flex-col gap-1 mb-6">
            <h1
              className={`text-4xl font-bold ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
            >
              Hii! I&apos;m{" "}
              <span className=" overflow-hidden bg-gradient-to-br from-blue-300 from-10% via-purple-300 to-red-300 transition-all duration-700 text-transparent bg-clip-text">
                Gemini
              </span>
              .
            </h1>
            <h2
              className={`text-lg ml-1 tracking-tight ${
                isDarkMode ? "text-copy-light" : "text-Lightcopy-light"
              }`}
            >
              As your first task, tell me stuff about you..
            </h2>
            <h3
              className={`text-lg ml-1 group-hover:translate-x-2 transition-all  tracking-tighter ${
                isDarkMode ? "text-copy-light" : "text-Lightcopy-light"
              }`}
            >
              Let&apos;s start by telling me your name.
            </h3>
          </div>
          <input
            type="text"
            required
            value={username}
            placeholder="Start Typing in your name"
            onChange={(e) => setUsername(e.target.value)}
            className="w-fit bg-transparent p-2 outline-none border-b border-copy placeholder:text-copy-light text-copy"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}
        </div>
      ),
    },
    {
      id: "nickname",
      component: (
        <div className="w-full h-full px-6 flex flex-col justify-center">
          <div>
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
            >
              Well, great! Nice to {'"see"'} you {username}
            </h1>
            <h2 className="text-gray-600">
              Now, let me know what should I call you?
            </h2>
          </div>

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-fit bg-transparent p-2 outline-none border-b border-copy placeholder:text-copy-light text-copy"
          />
          {errors.nickname && (
            <span className="text-red-500 text-sm">{errors.nickname}</span>
          )}
        </div>
      ),
    },
    {
      id: "about",
      component: (
        <div className="w-full h-full px-6 flex flex-col justify-center">
          <h1
            className={`text-xl font-bold ${
              isDarkMode ? "text-copy" : "text-copyLight"
            }`}
          >
            Sure thing! I&apos;ll call you {nickname}
          </h1>
          <h2 className="text-gray-600">
            Tell me about yourself, it&apos;s important
          </h2>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full resize-none bg-transparent p-2 outline-none border-b border-copy placeholder:text-copy-light text-copy"
          />
          {errors.about && (
            <span className="text-red-400 mt-1 text-sm">{errors.about}</span>
          )}
        </div>
      ),
    },
    {
      id: "Miscellaneous",
      component: (
        <div className="w-full h-full px-6 flex flex-col justify-center">
          <div className="w-full text-white">
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-copy" : "text-copyLight"
              }`}
            >
              As the last step {nickname}
            </h1>
            <h2 className="text-gray-600">Select what you want</h2>
          </div>
          <div className="w-full flex gap-6 items-center justify-center text-white">
            <DropDown setSelected={setTone} title={"tone"} />
            <DropDown setSelected={setNature} title={"nature"} />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      setPosition(position - 422);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setPosition(position + 422);
    }
  };

  return (
    <m.section
      key={"LoginPage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen absolute top-0 left-0 z-50 backdrop-blur-lg flex justify-center items-center p-3 smartphone:pb-24 ${
        isDarkMode ? "bg-background" : "bg-backgroundLight"
      } `}
    >
      <div
        className={`relative rounded-lg w-1/2 h-[422px] smartphone:w-full  overflow-hidden flex bg-gradient-to-br ${
          isDarkMode
            ? "from-foregroundLight/30 to-foregroundLight/20  text-copyLight"
            : "from-foreground/30 to-foreground/20 text-copyLight"
        } `}
      >
        <m.div
          initial={{ y: 0 }}
          animate={{ y: position }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "spring" }}
          className={`w-full h-full`}
        >
          {steps.map((step) => {
            return step.component;
          })}
        </m.div>
        <div
          className={`absolute right-1 w-2 h-full flex flex-col justify-center gap-1`}
        >
          {[0, 1, 2, 3].map((step) => (
            <m.div
              key={step}
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
        <div
          id="buttons"
          className={`absolute bottom-0 w-full h-fit flex justify-between p-4`}
        >
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Prev{currentStep}
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? onSubmit : handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </m.section>
  );
}
