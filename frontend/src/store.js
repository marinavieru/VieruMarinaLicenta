import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore ({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDeaultMiddleware) => getDeaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;