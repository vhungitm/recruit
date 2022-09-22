import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('system')) || {
  connection: null,
  sidebar: {
    show: false
  }
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setConnection: (state, action) => {
      state.connection = action.payload;

      return state;
    },
    setShowSidebar: state => {
      state.sidebar.show = !state.sidebar.show;
      localStorage.setItem('system', JSON.stringify(state));

      return state;
    }
  }
});

// Selections
export const selectSystemConnection = state => state.system.connection;
export const selectSystemSidebar = state => state.system.sidebar;

// Actions
export const systemActions = systemSlice.actions;

// Reducer
const systemReducer = systemSlice.reducer;
export default systemReducer;
