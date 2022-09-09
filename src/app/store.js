import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import systemReducer from './systemSlice';

const rootReducer = {
	auth: authReducer,
	system: systemReducer
};

const store = configureStore({
	reducer: rootReducer
});

export default store;
