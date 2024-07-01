import {
  DARK_MODE,
  FETCH_USER,
  ADD_USER,
  IS_LOGIN,
  LOGOUT_USER,
  CHANGE_USER,
  ADD_TRANSLATION,
  GLOBAL_HISTORY,
  CHAT_HISTORY,
  CURRENT_CHAT,
  DELETE_HISTORY,
} from "./Actions";

const initialState = {
  darkMode: true,
  isLoggedIn: false,
  userDetails: {},
  chatHistory: [],
  currentChat: [],
  translationHistory: [],
  globalHistory: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userDetails: action.payload.userDetails,
      };
    case ADD_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.payload.isOn,
      };
    case CHANGE_USER:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.key]: action.payload.update,
        },
      };
    case LOGOUT_USER:
      localStorage.removeItem("persist:root"); // Clear the persisted state
      return {
        ...state,
        isLoggedIn: false,
        userDetails: {},
        chatHistory: [],
        currentChat: [],
        translationHistory: [],
        globalHistory: [],
      };
    case ADD_TRANSLATION:
      return {
        ...state,
        translationHistory: [...state.translationHistory, action.payload],
      };
    case GLOBAL_HISTORY:
      return {
        ...state,
        globalHistory: [...state.globalHistory, action.payload],
      };
    case CURRENT_CHAT:
      return {
        ...state,
        currentChat: [
          ...state.currentChat,
          {
            sessionID: action.payload.sessionID,
            chat: {
              role: action.payload.chatObject.role,
              text: action.payload.chatObject.text,
              timestamp: action.payload.chatObject.timestamp,
            },
          },
        ],
      };
    case DELETE_HISTORY:
      return {
        ...state,
        globalHistory: [],
      };
    case CHAT_HISTORY: {
      // Find the existing session in chatHistory
      const existingSessionIndex = state.chatHistory.findIndex(
        (session) => session.sessionID === action.payload.sessionID
      );
      if (existingSessionIndex !== -1) {
        // Update the history of the existing session
        return {
          ...state,
          chatHistory: [
            ...state.chatHistory.slice(0, existingSessionIndex),
            {
              sessionID: action.payload.sessionID,
              history: action.payload.history,
            },
            ...state.chatHistory.slice(existingSessionIndex + 1),
          ],
        };
      } else {
        // Create a new session object
        return {
          ...state,
          chatHistory: [
            ...state.chatHistory,
            {
              sessionID: action.payload.sessionID,
              history: action.payload.history,
            },
          ],
        };
      }
    }

    default:
      return state;
  }
};

export default userReducer;
