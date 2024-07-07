import { m } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, logoutUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "@phosphor-icons/react";
import { EditIcon } from "../components/SvgIcons";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const isDarkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("edit");
  };

  const toggleDarkMode = () => {
    dispatch(darkMode(!isDarkMode));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const profileSection = (
    <section
      key="profile"
      className={`flex justify-between my-8  p-4 rounded-xl bg-gradient-to-tl ${
        isDarkMode
          ? "from-foreground to-Lightcopy-lighter/30"
          : "from-foreground/10 to-foreground/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`w-28 h-28 border border-double rounded-full grid place-content-center text-7xl ${
            isDarkMode
              ? "bg-foregroundLight/20 border-yellow-600"
              : "bg-foreground/50 border-yellow-600"
          }`}
        >
          {user.avatar}
        </span>
        <div className="flex flex-col justify-end tracking-tight">
          <h1 className="montserrat text-5xl">{user.username}</h1>
          <h2 className="open-sans text-xs my-2">
            All your info is right here!
          </h2>
        </div>
      </div>
      <div className={`flex flex-col justify-between items-start`}>
        <button
          onClick={toggleDarkMode}
          className={`overflow-hidden  p-1.5 rounded-full w-10 h-10 border ${
            isDarkMode
              ? "bg-copy-lighter/10 hover:bg-copy/20 border-copy-lighter hover:border-copy"
              : " bg-copy-light hover:bg-copy-lighter/50 border-copyLight hover:border-black"
          } transition-all`}
        >
          <span
            className={`flex flex-col gap-2 justify-center items-center ${
              isDarkMode ? "" : "-translate-y-9"
            } transition-all ease-in-out`}
          >
            <Moon size={"100%"} className={`pb-0.5`} weight="duotone" />
            <Sun size={"100%"} weight="duotone" />{" "}
          </span>
        </button>
        <button
          onClick={handleEdit}
          className={` flex justify-center items-center  p-1.5 rounded-full w-10 h-10 hover:text-blue-500  transition-all`}
        >
          <EditIcon />
        </button>
      </div>
    </section>
  );

  const otherInfoSection = (
    <section key="otherInfo" className="my-8">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">Nickname: {user.nickname}</span>
        <p className="text-base"></p>
        <span className="text-lg font-semibold">About:{user.about}</span>
        <p className="text-base"></p>
      </div>
    </section>
  );

  const preferencesSection = (
    <section key="preferences" className="my-8">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">Tone:{user.tone}</span>
        <span className="text-lg font-semibold">Nature: {user.nature}</span>
      </div>
    </section>
  );

  return (
    <m.section
      key={"ProfilePage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen px-5 pt-4 ${
        isDarkMode ? " text-copy" : "text-copyLight"
      }`}
    >
      <div className={`w-full h-full`}>
        {profileSection}
        {otherInfoSection}
        {preferencesSection}
        <button
          onClick={handleLogout}
          className={`mt-9 p-2 border-2 border-red-500 rounded-lg text-red-500 text-sm hover:bg-red-500/20 `}
        >
          Logout
        </button>
      </div>
    </m.section>
  );
}
