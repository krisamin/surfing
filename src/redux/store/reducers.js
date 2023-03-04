import { combineReducers } from 'redux';

import userSlice from '../slices/user';
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export default rootReducer;