import authAPI from 'API/authAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  loading: true,
  currentUser: JSON.parse(sessionStorage.getItem('user'))
};

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  sessionStorage.removeItem('token');
  const res = await authAPI.refreshToken();

  if (res.succeeded) return res.data;
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const currentUser = action.payload;
      state.currentUser = currentUser;

      if (currentUser) {
        sessionStorage.setItem('user', JSON.stringify(currentUser));
        sessionStorage.setItem('token', JSON.stringify(currentUser.jwToken));
      } else {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      }

      return state;
    }
  },
  extraReducers: {
    [refreshToken.pending]: state => {
      state.loading = true;
      return state;
    },
    [refreshToken.fulfilled]: (state, action) => {
      const data = action.payload;

      if (data) {
        sessionStorage.setItem('token', JSON.stringify(data.jwToken));
        sessionStorage.setItem('user', JSON.stringify(data));
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }

      state.currentUser = data;
      state.loading = false;

      return state;
    },
    [refreshToken.rejected]: state => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      state.currentUser = null;
      state.loading = false;

      return state;
    }
  }
});

// Selections
export const selectAuthLoading = state => state.auth.loading;
export const selectCurrentUser = state => state.auth.currentUser;

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
