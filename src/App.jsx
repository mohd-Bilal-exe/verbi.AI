import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import GrammarPage from "./pages/grammarPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/profilePage";
import TranslatePage from "./pages/TranslatePage"
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/loginPage";
import { useEffect } from "react";
import { fetchUser } from "./Redux/Actions";
import { rememberMe } from "./Api/aiApi";

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.darkMode);
  const userDetails = useSelector(state => state.userDetails);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      rememberMe(userDetails.password, userDetails.username, userDetails.nickname, userDetails.about);
    }
  }, [userDetails]);

  return (
    <AnimatePresence>
      <BrowserRouter>
        <div className={`background-grid w-screen h-min-screen overflow-x-hidden overflow-y-auto flex flex-col justify-center ${isDarkMode ? 'bg-bg1 text-white' : 'text-bg1'}`}>
          <Routes>
            <Route path="/" element={<TranslatePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/grammarcheck" element={<GrammarPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>

          <Navbar />
        </div>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
