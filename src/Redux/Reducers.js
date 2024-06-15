// Import action types
import {
    DARK_MODE,
    FETCH_USER,
    ADD_USER,
    IS_LOGIN,
    LOGOUT_USER,
    CHANGE_USER // Assuming CHANGE_USER is added to Actions.js
  } from './Actions';
  
  // Initial state with user details
  const initialState = {
    darkMode: true,
    isLoggedIn: false,
    userDetails: {
      username: "billuDon",
      password: "Hydrabad",
      nickname: "aalu",
      description: "kuchbhi",
    },
  };
  
  // Reducer function
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER:
        console.log(`State from ${action.type} is ${state.userDetails}`);
        return {
          ...state,
          isLoggedIn: action.payload.user.isLoggedIn,
          userDetails: action.payload.user.userDetails,
        };
      case ADD_USER:
        console.log(`State from ${action.type} is ${state.userDetails}`);
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            username: action.payload.user.username,
            nickname: action.payload.user.nickname,
            email: action.payload.user.email,
            password: action.payload.user.password,
          },
        };
      case IS_LOGIN:
        console.log(`State from ${action.type} is ${state.isLoggedIn}`);
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
        };
      case DARK_MODE:
        console.log(`State from ${action.type} is ${state.darkMode}`);
        return {
          ...state,
          darkMode: action.payload.isOn,
        };
      case CHANGE_USER:
        console.log(`State from ${action.type} is ${state.userDetails}`);
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            [action.payload.key]: action.payload.update,
          },
        };
      case LOGOUT_USER:
        console.log(`State from ${action.type} is ${state.isLoggedIn}`);
        return {
          ...state,
          isLoggedIn: false,
          userDetails: null,
        };
      default:
        console.log(`State from ${action.type} is ${state}`);
        return state;
    }
  };
  
  export default userReducer;