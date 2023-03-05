import { combineReducers } from 'redux';

import userSlice from '../slices/user';
import circleSlice from '../slices/circle';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  circle: circleSlice.reducer,
});

export default rootReducer;