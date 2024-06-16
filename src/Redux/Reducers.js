import {
  DARK_MODE,
  FETCH_USER,
  ADD_USER,
  IS_LOGIN,
  LOGOUT_USER,
  CHANGE_USER
} from './Actions';

const initialState = {
  darkMode: true,
  isLoggedIn: false,
  userDetails: {}, // Initialize as an empty object
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
      localStorage.removeItem('userDetails');
      return {
        ...state,
        isLoggedIn: false,
        userDetails: {}, // Update userDetails to empty object
      };
    default:
      return state;
  }
};

export default userReducer;
