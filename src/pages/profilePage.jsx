import { m } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, logoutUser } from "../Redux/Actions";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const isDarkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleDarkMode = () => {
    dispatch(darkMode(!isDarkMode));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // Navigate to login page after logout
    navigate("/login");
  };

  const sections = [
    {
      id: "profile",
      attributes: [
        {
          name: user.username,
          avatar: user.Avatar,
        },
      ],
    },
    {
      id: "otherInfo",
      attributes: [
        {
          nicknme: user.nickname,
          about: user.about,
        },
      ],
    },
    {
      id: "Preferences",
      attributes: [
        {
          tone: user.tone,
          nature: user.nature,
        },
      ],
    },
  ];
  console.log(sections);
  return (
    <m.section
      key={"ProfilePage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen ${
        isDarkMode ? "bg-bg1 text-copy" : "text-copyLight"
      }`}
    >
      <button onClick={handleLogout}>logount</button>
    </m.section>
  );
}
