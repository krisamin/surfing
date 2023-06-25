import { combineReducers } from 'redux';

import userSlice from '@redux/slices/user';
import circleSlice from '@redux/slices/circle';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  circle: circleSlice.reducer,
});

export default rootReducer;