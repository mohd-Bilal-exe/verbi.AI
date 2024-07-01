// UserActions.js
export const DARK_MODE = "DARK_MODE";
export const FETCH_USER = "FETCH_USER";
export const ADD_USER = "ADD_USER";
export const IS_LOGIN = "IS_LOGIN";
export const CHANGE_USER = "CHANGE_USER"; // New action type
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_TRANSLATION = "ADD_TRANSLATION";
export const GLOBAL_HISTORY = "GLOBAL_HISTORY";
export const CHAT_HISTORY = "CHAT_HISTORY";
export const CURRENT_CHAT = "CURRENT_CHAT";
export const addChatHistory = (sessionID, history) => ({
  type: CHAT_HISTORY,
  payload: { sessionID, history },
});
export const currentChat = (sessionID, chatObject) => {
  return {
    type: CURRENT_CHAT,
    payload: { sessionID, chatObject },
  };
};
export const darkMode = (isOn) => ({
  type: DARK_MODE,
  payload: { isOn },
});
export const fetchTask = () => ({});
export const globalHistory = (history) => ({
  type: GLOBAL_HISTORY,
  payload: history, //should be predefined object with history fileds like type, time and info object.
});
export const addTranslations = (translations) => ({
  type: ADD_TRANSLATION,
  payload: translations, //SHOULD BE PREDEFINED OBJECT WITH TRANSLATIONS
});

export const addUser = (username, nickname, email, password) => {
  return (dispatch) => {
    try {
      const newUser = { username, nickname, email, password };

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

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
