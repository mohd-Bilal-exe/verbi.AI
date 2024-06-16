// UserActions.js

export const DARK_MODE = "DARK_MODE";
export const FETCH_USER = "FETCH_USER";
export const ADD_USER = "ADD_USER";
export const IS_LOGIN = "IS_LOGIN";
export const CHANGE_USER = "CHANGE_USER"; // New action type
export const LOGOUT_USER = "LOGOUT_USER";

export const darkMode = (isOn) => ({
  type: DARK_MODE,
  payload: { isOn },
});

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const retrievedString = localStorage.getItem("userDetails");

      const retrievedObject = JSON.parse(retrievedString) || {
        isLoggedIn: false,
        userDetails: null,
      };
      dispatch({
        type: FETCH_USER,
        payload: { userDetails: retrievedObject, isLoggedIn: true },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};

export const addUser = (username, nickname, email, password) => {
  return (dispatch) => {
    try {
      const newUser = { username, nickname, email, password };

      // Dispatch the action to update the global state
      dispatch({ type: ADD_USER, payload: newUser });

      // Update local storage with the new user
      localStorage.setItem("userDetails", JSON.stringify(newUser));
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
