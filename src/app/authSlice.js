const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	loading: true,
	currentUser: JSON.parse(sessionStorage.getItem('user'))
};

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
