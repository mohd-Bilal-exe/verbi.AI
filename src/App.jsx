/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import ChatPage from "./pages/chatPage";
import GrammarPage from "./pages/grammarPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/profilePage";
import TranslatePage from "./pages/TranslatePage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const isDarkMode = useSelector((state) => state.darkMode);
  const userDetails = useSelector((state) => state.userDetails);
  const isLoggedin = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 2500);  // Display the welcome screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <div
          className={`background-grid w-screen h-min-screen   overflow-x-hidden overflow-y-auto flex flex-col justify-center ${isDarkMode
            ? "bg-background scrollbar-dark selection:bg-copy-light selection:text-copyLight"
            : "bg-backgroundLight scrollbar-custom selection:bg-copyLight selection:text-copy-light"
            } transition-colors duration-300 open-sans`}
        >
          <AnimatePresence>
            {showWelcomeScreen ? (
              <WelcomeScreen />
            ) : (
              <>
                <Routes location={location} >
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
                  {isLoggedin ? (
                    <>
                      <Route path="/Chat" element={<ChatPage />} />
                      <Route path="/GrammarCheck" element={<GrammarPage />} />
                      <Route path="/Profile" element={<ProfilePage />} />
                      <Route path="/Translate" element={<TranslatePage />} />
                      <Route path="/Home" element={<Navigate to="/" />} />
                      <Route path="/Login" element={<LoginPage />} />
                    </>
                  ) : (
                    <Route path="/Login" element={<LoginPage />} />
                  )}

                </Routes>
                <Navbar />
              </>
            )}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;
