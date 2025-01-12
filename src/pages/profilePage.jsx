import { useState } from "react";
import { m } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, deleteChatHistory, logoutUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "@phosphor-icons/react";
import { ArrowDown, EditIcon } from "../components/SvgIcons";
import EditModal from "../components/EditModal";

// This is the ProfilePage component
export default function ProfilePage() {
  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // useSelector hook to access userDetails state from the Redux store
  const user = useSelector((state) => state.userDetails);

  // useState hook to manage the clearIsclicked state
  const [clearIsclicked, setClearIsclicked] = useState(false);

  // useSelector hook to access darkMode state from the Redux store
  const isDarkMode = useSelector((state) => state.darkMode);

  // useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // useState hook to manage the editSection state
  const [editSection, setEditSection] = useState(null);

  // Handles the edit section of the profile page.
  const handleEdit = (section) => {
    // Set the section to be edited.
    setEditSection(section);
  };

  // Toggles the dark mode state by dispatching the 'darkMode' action with the opposite of the current state.
  const toggleDarkMode = () => {
    // Dispatch the 'darkMode' action with the opposite of the current state.
    // This will update the dark mode state in the Redux store.
    dispatch(darkMode(!isDarkMode));
  };

  /**
   * Handles the logout functionality.
   * 
   * This function dispatches the 'logoutUser' action to logout the user.
   * It also navigates the user to the login page.
   */
  const handleLogout = () => {
    // Dispatch the 'logoutUser' action to logout the user.
    // This will update the user details in the Redux store.
    dispatch(logoutUser());

    // Navigate the user to the login page.
    navigate("/Login");
  };

  /**
   * Handles the clear chat history functionality.
   * 
   * This function dispatches the 'deleteChatHistory' action to clear the chat history.
   * It also sets the 'clearIsclicked' state to true.
   */
  const handleChatclear = () => {
    // Dispatch the 'deleteChatHistory' action to clear the chat history.
    // This will update the chat history in the Redux store.
    dispatch(deleteChatHistory());

    // Set the 'clearIsclicked' state to true.
    setClearIsclicked(true);
  };

  /**
   * Closes the edit modal by setting the edit section to null.
   * This is called when the user clicks the close button in the edit modal.
   */
  const closeModal = () => {
    // Set the edit section to null, which will close the edit modal.
    setEditSection(null);
  };
  // Sections set up for different parts of the profile page

  // Avatar and name section
  const profileSection = (
    <section
      key="profile"
      className={`flex justify-between my-4 smartphone:my-8 p-4 rounded-xl open-sans bg-gradient-to-tl ${isDarkMode
        ? "from-foreground to-Lightcopy-lighter/30"
        : "from-foreground/10 to-foreground/20"
        }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`relative w-28 h-28 smartphone:size-24 border border-double rounded-full grid place-content-center text-7xl smartphone:text-6xl  ${isDarkMode
            ? "bg-foregroundLight/20 border-yellow-600"
            : "bg-foreground/50 border-yellow-600"
            }`}
        >
          {user.avatar}
          <button
            onClick={() => handleEdit("avatar")}
            className="absolute bottom-0 right-0 flex justify-center items-center p-1 pl-1.5 rounded-full size-7 bg-gray-950/60 text-copy hover:text-blue-500 transition-all"
          >
            <EditIcon />
          </button>
        </span>
        <div className="flex flex-col justify-end tracking-tight">
          <h1 className="montserrat text-5xl lg:text-6xl">{user.username}</h1>
          <h2 className="open-sans text-xs lg:text-sm m-2">
            All your info is right here!
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <button
          onClick={toggleDarkMode}
          className={`overflow-hidden p-1.5 rounded-full w-10 h-10 smartphone:size-7 border ${isDarkMode
            ? "bg-copy-lighter/10 hover:bg-copy/20 border-copy-lighter hover:border-copy"
            : "bg-copy-light hover:bg-copy-lighter/50 border-copyLight hover:border-black"
            } transition-all`}
        >
          <span
            className={`flex flex-col gap-2 justify-center items-center ${isDarkMode ? "" : "-translate-y-9 smartphone:-translate-y-6"
              } transition-all ease-in-out`}
          >
            <Moon size={"100%"} className="pb-0.5" weight="duotone" />
            <Sun size={"100%"} weight="duotone" />
          </span>
        </button>
        <button
          onClick={() => handleEdit("username")}
          className="flex justify-center items-center p-1 rounded-full size-7 hover:text-blue-500 transition-all"
        >
          <EditIcon />
        </button>
      </div>
    </section>
  );

  // Nickname and About section
  const OtherInfoSection = () => {
    const [isNicknameExpanded, setIsNicknameExpanded] = useState(false);
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);

    const toggleNicknameExpand = () => {
      setIsNicknameExpanded(!isNicknameExpanded);
    };

    const toggleAboutExpand = () => {
      setIsAboutExpanded(!isAboutExpanded);
    };

    return (
      <m.section
        layout
        key="otherInfo"
        className={`quicksand my-4 smartphone:my-8 rounded-xl bg-gradient-to-tl ${isDarkMode
          ? "from-foreground to-Lightcopy-lighter/30"
          : "from-foreground/10 to-foreground/20"
          }`}
      >
        <m.div layout className="flex flex-col p-3">
          <m.div layout className="my-1 ml-2">
            <span
              onClick={toggleNicknameExpand}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold smartphone:text-lg lg:text-xl">
                Nickname
              </h2>
              <m.span
                className={`mx-2 ${isNicknameExpanded ? "rotate-90" : ""
                  } transition-all`}
              >
                <ArrowDown />
              </m.span>
            </span>
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isNicknameExpanded ? 1 : 0,
                height: isNicknameExpanded ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <m.span
                key="nickname"
                className="flex justify-between font-medium mt-2 ml-3 smartphone:text-sm lg:text-base"
              >
                {user.nickname}
                <button
                  onClick={() => handleEdit("nickname")}
                  className="flex justify-center items-center p-1 rounded-full size-6 hover:text-blue-500 transition-all"
                >
                  <EditIcon />
                </button>
              </m.span>
            </m.div>
          </m.div>
          <div className="w-11/12 h-[1px] mx-3 bg-black/10 place-self-center"></div>
          <div className="my-1 ml-2">
            <span
              onClick={toggleAboutExpand}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold smartphone:text-lg lg:text-xl">
                About
              </h2>
              <m.span
                className={`mx-2 ${isAboutExpanded ? "rotate-90" : ""
                  } transition-all`}
              >
                <ArrowDown />
              </m.span>
            </span>
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isAboutExpanded ? 1 : 0,
                height: isAboutExpanded ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <m.span
                key="about"
                className="flex justify-between font-medium mt-2 ml-3 smartphone:text-sm lg:text-base"
              >
                {user.about === ""
                  ? "Wopsie! You haven't added an About yet"
                  : user.about}
                <button
                  onClick={() => handleEdit("about")}
                  className="flex justify-center items-center p-1 rounded-full size-6 hover:text-blue-500 transition-all"
                >
                  <EditIcon />
                </button>
              </m.span>
            </m.div>
          </div>
        </m.div>
      </m.section>
    );
  };

  // Tone and Nature section
  const PreferencesSection = () => {
    const [isToneExpanded, setIsToneExpanded] = useState(false);
    const [isNatureExpanded, setIsNatureExpanded] = useState(false);

    const toggleToneExpand = () => {
      setIsToneExpanded(!isToneExpanded);
    };

    const toggleNatureExpand = () => {
      setIsNatureExpanded(!isNatureExpanded);
    };

    return (
      <m.section
        layout
        key="preferences"
        className={`quicksand my-4 smartphone:my-8 rounded-xl bg-gradient-to-tl ${isDarkMode
          ? "from-foreground to-Lightcopy-lighter/30"
          : "from-foreground/10 to-foreground/20"
          }`}
      >
        <m.div layout className="flex flex-col p-3">
          <m.div layout className="my-1 ml-2">
            <span
              onClick={toggleToneExpand}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold smartphone:text-lg lg:text-xl">
                Tone
              </h2>
              <m.span
                className={`mx-2 ${isToneExpanded ? "rotate-90" : ""
                  } transition-all`}
              >
                <ArrowDown />
              </m.span>
            </span>
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isToneExpanded ? 1 : 0,
                height: isToneExpanded ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <m.span
                key="tone"
                className="flex justify-between font-medium mt-2 ml-3 smartphone:text-sm lg:text-base"
              >
                {user.Tone}
                <button
                  onClick={() => handleEdit("Tone")}
                  className="flex justify-center items-center p-1 rounded-full size-6 hover:text-blue-500 transition-all"
                >
                  <EditIcon />
                </button>
              </m.span>
            </m.div>
          </m.div>
          <div className="w-11/12 h-[1px] mx-3 bg-black/10 place-self-center"></div>
          <div className="my-1 ml-2">
            <span
              onClick={toggleNatureExpand}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold smartphone:text-lg lg:text-xl">
                Nature
              </h2>
              <m.span
                className={`mx-2 ${isNatureExpanded ? "rotate-90" : ""
                  } transition-all`}
              >
                <ArrowDown />
              </m.span>
            </span>
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isNatureExpanded ? 1 : 0,
                height: isNatureExpanded ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <m.span
                key="nature"
                className="flex justify-between font-medium mt-2 ml-3 smartphone:text-sm lg:text-base"
              >
                {user.Nature}
                <button
                  onClick={() => handleEdit("Nature")}
                  className="flex justify-center items-center p-1 rounded-full size-6 hover:text-blue-500 transition-all"
                >
                  <EditIcon />
                </button>
              </m.span>
            </m.div>
          </div>
        </m.div>
      </m.section>
    );
  };

  // Main return of ProfilePage component
  return (
    <m.section
      key="ProfilePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen flex flex-col justify-start items-center px-5 lg:pt-3 pt-2 ${isDarkMode ? "text-copy" : "text-copyLight"
        }`}
    >
      <div className="lg:w-3/5 smartphone:w-full">
        {profileSection}
        <OtherInfoSection />
        <PreferencesSection />
        <section
          className={`my-4 h-fit smartphone:my-8 rounded-xl flex justify-between text-xs lg:text-sm`}
        >
          <button
            onClick={handleChatclear}
            className={`p-1 px-2 border-2 ${isDarkMode
              ? "text-copy border-copy-light hover:bg-copy/20"
              : "text-copyLight border-Lightcopy-light hover:bg-copyLight/20"
              } rounded-lg`}
          >
            {clearIsclicked ? "Done" : "Clear All Chats"}
          </button>
          <button
            onClick={handleLogout}
            className="p-1 px-2 tracking-wide border-2 border-red-500 rounded-lg text-red-500 hover:bg-red-500/20"
          >
            Logout
          </button>
        </section>

        {editSection && (
          <EditModal attributes={editSection} onClose={closeModal} />
        )}
      </div>
    </m.section>
  );
}
