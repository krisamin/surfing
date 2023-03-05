import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: null,
  scroll: 0,
  category: 0
};

const circleSlice = createSlice({
  name: 'circle',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setScroll(state, action) {
      state.scroll = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    }
  },
});

export default circleSlice;