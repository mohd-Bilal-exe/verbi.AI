import { m } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, logoutUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const isDarkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    dispatch(darkMode(!isDarkMode));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const profileSection = (
    <section key="profile" className="my-8">
      <div className="flex items-center gap-10">
        <span
          className={`w-28 h-28 border border-double rounded-full grid place-content-center text-7xl ${
            isDarkMode
              ? "bg-foregroundLight/20 border-yellow-600"
              : "bg-foreground/80"
          }`}
        >
          {user.avatar}
        </span>
        <div className="flex flex-col justify-end">
          <h1 className="montserrat text-5xl tracking-tight">
            {user.username}
          </h1>
          <h2 className="open-sans text-sm tracking-tight">
            All your info is right here!
          </h2>
        </div>
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
        isDarkMode ? "bg-bg1 text-copy" : "text-copyLight"
      }`}
    >
      <div className={`w-full h-full`}>
        {profileSection}
        {otherInfoSection}
        {preferencesSection}
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Logout
        </button>
      </div>
    </m.section>
  );
}
