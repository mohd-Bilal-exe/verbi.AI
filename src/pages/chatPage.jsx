import { useEffect, useState } from "react";
import { chat } from "../Api/aiApi";
import Markdown from 'react-markdown';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";

export default function ChatPage() {
  const isDarkMode = useSelector(state => state.darkMode);
  const password = useSelector(state => state.userDetails.password); // Corrected from password to email
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setSessionId(password);
  }, [password]); // Added dependency array with email

  const handleSendMessage = async (data) => {
    setResponse("");
    setOpacity(0);
    try {
      const result = await chat(sessionId, data.inputValue);
      if (result.error) {
        console.error("Chat Error:", result.error);
        setResponse(result.text);
      } else {
        console.log(result.text);
        setResponse(result.text);
        setTimeout(() => {
          console.log(opacity)
          setOpacity(1);
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong!!");
    }
  };

  const staggerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: opacity,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key="chatPage"
      initial={{ opacity: 0, }}
      animate={{ opacity: 1,}}
      exit={{ opacity: 0, }}
      transition={{duration:0.5, type:"spring"}}
      className={`w-screen h-screen py-9 flex flex-col items-center justify-center ${isDarkMode ? 'bg-bg1/10 text-white' : 'text-bg1'}`}
    >
      <div className="bg-black/50 rounded-xl min-h-96 w-11/12 shadow-md">
        <motion.div
          id="response"
          className="-4 mb-4 border-b"
          variants={staggerVariants}
          initial="initial"
          animate="animate"
        >
          {response && (
            <div className="response-content">
              <p className="text-sm font-semibold">Response:</p>
              <div id="responseParent" className="h-full overflow-y-auto open-sans">
                <Markdown
                  key={response}
                  components={{
                    p: (props) => (
                      <motion.p variants={fadeInUpVariants} {...props} />
                    ),
                    h1: (props) => (
                      <motion.h1 variants={fadeInUpVariants} {...props} />
                    ),
                    h2: (props) => (
                      <motion.h2 variants={fadeInUpVariants} {...props} />
                    ),
                    h3: (props) => (
                      <motion.h3 variants={fadeInUpVariants} {...props} />
                    ),
                    li: (props) => (
                      <motion.li variants={fadeInUpVariants} {...props} />
                    ),
                  }}
                >
                  {response}
                </Markdown>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className="form-container fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-8 pb-8">
        <form onSubmit={handleSubmit(handleSendMessage)} className="w-full">
          <div className="flex items-center">
            <input
              type="text"
              {...register('inputValue')}
              placeholder="Type your message..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline mr-4 bg-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
