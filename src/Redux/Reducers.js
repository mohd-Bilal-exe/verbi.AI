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
  DELETE_CHAT_HISTORY,
  HISTORY_CHAT_UPDATE,
  CREATE_NEW_CHAT,
  SET_CURRENT_CHAT_ID,
  SET_CURRENT_CHAT,
  DELETE_GLOBAL_HISTORY,
  DELETE_CURRENT_CHAT,
  ADD_CHAT_TITLE,
  DELETE_CURRENT_CHAT_HISTORY,
} from "./Actions";

const initialState = {
  darkMode: true,
  isLoggedIn: false,
  userDetails: {},
  chatHistory: [],
  currentChat: [],
  currentChatId: "",
  translationHistory: [],
  globalHistory: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoggedIn: true,
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
      return {
        ...state,
        isLoggedIn: false,
        userDetails: {},
        chatHistory: {},
        currentChat: [],
        currentChatID: "",
        globalHistory: [],
      };

    case ADD_TRANSLATION:
      return {
        ...state,
        translationHistory: [...state.translationHistory, action.payload],
      };
    case SET_CURRENT_CHAT_ID:
      return {
        ...state,
        currentChatID: action.payload,
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
            role: action.payload.chatObject.role,
            parts: [{ text: action.payload.chatObject.parts[0].text }],
            timestamp: action.payload.chatObject.timestamp,
          },
        ],
      };

    case DELETE_CURRENT_CHAT: {
      const sessionID = action.payload;
      console.log("Session ID to delete:", sessionID); // Debugging log
      console.log("Chat keys:", Object.keys(state.chatHistory)); // Debugging log
      const { [sessionID]: chatToDelete, ...remainingChats } =
        state.chatHistory;
      console.log("remainingChats", remainingChats); // Debugging log
      return {
        ...state,
        chatHistory: remainingChats,
        currentChat: [],
      };
    }
    case DELETE_CURRENT_CHAT_HISTORY:
      return {
        ...state,
        currentChat: [],
      };
    case DELETE_CHAT_HISTORY:
      return {
        ...state,
        currentChat: [],
        chatHistory: {},
      };
    case CREATE_NEW_CHAT:
      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [action.payload]: { history: [] },
        },
      };
    case ADD_CHAT_TITLE:
      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [action.payload.sessionID]: {
            ...state.chatHistory[action.payload.sessionID],
            title: action.payload.title,
          },
        },
      };
    case CHAT_HISTORY: {
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

    case HISTORY_CHAT_UPDATE: {
      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [action.payload.sessionID]: {
            ...state.chatHistory[action.payload.sessionID],
            history: [
              ...(state.chatHistory[action.payload.sessionID]?.history || []),
              action.payload.msg,
            ],
          },
        },
      };
    }
    case SET_CURRENT_CHAT: {
      const selectedChat = state.chatHistory[action.payload];
      return {
        ...state,
        currentChat: selectedChat ? selectedChat.history : [],
      };
    }
    case DELETE_GLOBAL_HISTORY: {
      return {
        ...state,
        globalHistory: [],
      };
    }
    default:
      return state;
  }
};

export default userReducer;
