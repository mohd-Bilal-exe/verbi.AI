import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import GrammarPage from "./pages/grammarPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/profilePage";
import TranslatePage from "./pages/TranslatePage";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import LoginPage from "./pages/loginPage";
import { useEffect } from "react";
import { rememberMe } from "./Api/aiApi";
import HomePage from "./pages/HomePage";

function App() {
  const isDarkMode = useSelector((state) => state.darkMode);
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (userDetails) {
      rememberMe(
        userDetails.password,
        userDetails.username,
        userDetails.nickname,
        userDetails.about
      );
    }
  }, [userDetails]);

  return (
    <AnimatePresence>
      <BrowserRouter>
        <div
          className={`background-grid w-screen h-min-screen overflow-x-hidden overflow-y-auto flex flex-col justify-center ${
            isDarkMode
              ? "bg-background scrollbar-dark"
              : "bg-backgroundLight scrollbar-custom"
          }`}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/grammarcheck" element={<GrammarPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/translate" element={<TranslatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Navigate to="/" />} />
          </Routes>
          <Navbar />
        </div>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
