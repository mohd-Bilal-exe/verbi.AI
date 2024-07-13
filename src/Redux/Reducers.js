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
  DELETE_CHAT_HISTORY,
  HISTORY_CHAT_UPDATE,
  CREATE_NEW_CHAT,
  SET_CURRENT_CHAT_ID,
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

    case DELETE_HISTORY:
      return {
        ...state,
        chatHistory: {},
        currentChat: [],
      };

    case DELETE_CHAT_HISTORY:
      return {
        ...state,
        currentChat: [],
      };
    case CREATE_NEW_CHAT:
      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [action.payload]: { history: [] },
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
    case "SET_CURRENT_CHAT": {
      const selectedChat = state.chatHistory[action.payload];
      return {
        ...state,
        currentChat: selectedChat ? selectedChat.history : [],
      };
    }

    default:
      return state;
  }
};

export default userReducer;
