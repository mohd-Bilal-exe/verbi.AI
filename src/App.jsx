import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import GrammarPage from "./pages/grammarPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/profilePage";
import TranslatePage from "./pages/TranslatePage";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import LoginPage from "./pages/loginPage";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 2600); // Display the welcome screen for 2.6 seconds

    return () => clearTimeout(timer);
  }, []);

  const isDarkMode = useSelector((state) => state.darkMode);
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <div
          className={`background-grid w-screen h-min-screen overflow-x-hidden overflow-y-auto flex flex-col justify-center ${
            isDarkMode
              ? "bg-background scrollbar-dark"
              : "bg-backgroundLight scrollbar-custom"
          } transition-colors open-sans`}
        >
          <AnimatePresence>
            {showWelcomeScreen ? (
              <WelcomeScreen />
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    Object.keys(userDetails).length > 0 ? (
                      <HomePage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/Chat" element={<ChatPage />} />
                <Route path="/GrammarCheck" element={<GrammarPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/Translate" element={<TranslatePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<Navigate to="/" />} />
              </Routes>
            )}
            {location.pathname !== "/login" && <Navbar />}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;
