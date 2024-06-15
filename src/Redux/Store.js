import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import taskReducer from './TaskReducer';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, // Enable Redux DevTools extension
});

export default store;