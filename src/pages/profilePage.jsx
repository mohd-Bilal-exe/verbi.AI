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

  return (
    <m.section
      key={"ProfilePage"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`w-screen h-screen ${
        isDarkMode ? "bg-bg1 text-text1" : "text-bg1"
      }`}
    >
      {user && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xl font-semibold">{user.username}</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium uppercase bg-accent1 text-white shadow-md hover:bg-accent2 focus:outline-none"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "Dark Mode on" : "Light Mode on"}
            </button>
          </div>
          <button
            className="px-4 py-2 rounded-md text-sm font-medium uppercase bg-red-500 text-white shadow-md hover:bg-red-600 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </m.section>
  );
}
