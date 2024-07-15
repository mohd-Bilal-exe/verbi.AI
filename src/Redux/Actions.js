// UserActions.js
export const DARK_MODE = "DARK_MODE";
export const FETCH_USER = "FETCH_USER";
export const ADD_USER = "ADD_USER";
export const IS_LOGIN = "IS_LOGIN";
export const CHANGE_USER = "CHANGE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TRANSLATION = "ADD_TRANSLATION";
export const GLOBAL_HISTORY = "GLOBAL_HISTORY";
export const CHAT_HISTORY = "CHAT_HISTORY";
export const CURRENT_CHAT = "CURRENT_CHAT";
export const DELETE_CHAT_HISTORY = "DELETE_CHAT_HISTORY";
export const DELETE_HISTORY = "DELETE_HISTORY";
export const DELETE_CURRENT_CHAT = "DELETE_CURRENT_CHAT";
export const DELETE_CURRENT_CHAT_HISTORY = "DELETE_CURRENT_CHAT_HISTORY";
export const CREATE_NEW_CHAT = "CREATE_NEW_CHAT";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const HISTORY_CHAT_UPDATE = "HISTORY_CHAT_UPDATE";
export const SET_CURRENT_CHAT_ID = "SET_CURRENT_CHAT_ID";
export const DELETE_GLOBAL_HISTORY = "DELETE_GLOBAL_HISTORY";
export const ADD_CHAT_TITLE = "ADD_CHAT_TITLE";
export const addChatHistory = (sessionID, history) => ({
  type: CHAT_HISTORY,
  payload: { sessionID, history },
});
export const darkMode = (isOn) => ({
  type: DARK_MODE,
  payload: { isOn },
});
export const fetchTask = () => ({});
export const globalHistory = (history) => ({
  type: GLOBAL_HISTORY,
  payload: history, // Predefined object with history fileds like type, time and info object.
});
export const addTranslations = (translations) => ({
  type: ADD_TRANSLATION,
  payload: translations, // PREDEFINED OBJECT WITH TRANSLATIONS
});

export const addUser = (
  id,
  username,
  nickname,
  about,
  avatar,
  tone,
  nature
) => {
  return (dispatch) => {
    try {
      const newUser = { id, username, nickname, about, avatar, tone, nature };

      // Dispatch the action to update the global state
      dispatch({ type: ADD_USER, payload: newUser });
      dispatch({ type: IS_LOGIN, payload: { isLoggedIn: true } });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
};

export const changeUser = (key, update) => ({
  type: CHANGE_USER,
  payload: { key, update },
});

export const isLogin = (isLoggedIn) => ({
  type: IS_LOGIN,
  payload: { isLoggedIn },
});

export const deleteHistory = () => ({
  type: DELETE_GLOBAL_HISTORY,
});
export const deleteCurrentchatHistory = () => ({
  type: DELETE_CURRENT_CHAT,
});
export const deleteChatHistory = () => ({
  type: DELETE_CHAT_HISTORY,
});
export const addChatsHistory = (sessionID, msg) => ({
  type: HISTORY_CHAT_UPDATE,
  payload: { sessionID, msg },
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
export const createNewChat = (sessionID) => ({
  type: CREATE_NEW_CHAT,
  payload: sessionID,
});

export const addChatTitle = (sessionID, title) => ({
  type: ADD_CHAT_TITLE,
  payload: { sessionID, title },
});

export const setCurrentChatId = (sessionID) => ({
  type: SET_CURRENT_CHAT_ID,
  payload: sessionID,
});

export const setCurrentChat = (sessionId) => ({
  type: SET_CURRENT_CHAT,
  payload: sessionId,
});

export const currentChat = (sessionID, chatObject) => ({
  type: CURRENT_CHAT,
  payload: { sessionID, chatObject },
});

export const chatHistory = (sessionID, history) => ({
  type: CHAT_HISTORY,
  payload: { sessionID, history },
});
