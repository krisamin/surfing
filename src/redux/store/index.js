import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers.js';
import reduxThunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(reduxThunk);
    /*if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();*/
  },
});
export default store;