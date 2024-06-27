import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import taskReducer from "./TaskReducer";
import thunk from "redux-thunk"; // Ensure you're importing the default export

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["someNonPersistentReducer"], // Add reducers here that you don't want to persist
  // or use whitelist to specify only those reducers you want to persist
  // whitelist: ['reducerToPersist'],
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, // Enable Redux DevTools extension
});

export const persistor = persistStore(store);
export default store;
