import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Updated import
import userReducer from "./Redux/Reducers"; // Adjusted import if needed

import App from "./App";
import "./index.css";

const store = createStore(userReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
