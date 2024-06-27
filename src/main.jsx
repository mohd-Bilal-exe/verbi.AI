import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { thunk } from "redux-thunk"; // Ensure correct import
import userReducer from "./Redux/Reducers"; // Adjust import if needed

import App from "./App";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["currentChat", "chatHistory"], // Add reducers here that you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
