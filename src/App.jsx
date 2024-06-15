import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import GrammarPage from "./pages/grammarPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/profilePage";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

function App() {
  const isDarkMode = useSelector(state => state.darkMode);
  return (
    <AnimatePresence>
      <BrowserRouter>
        <div className={`background-grid w-screen h-min-screen overflow-x-hidden overflow-y-auto flex flex-col justify-center ${isDarkMode ? 'bg-bg1 text-white' : 'text-bg1'}`}>
          <Routes>
            <Route path="/" element={<GrammarPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/grammarcheck" element={<GrammarPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<div className="w-screen h-screen grid place-content-center text-7xl"> login page</div>} />
          </Routes>

          <Navbar />
        </div>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
