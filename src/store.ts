import { configureStore } from '@reduxjs/toolkit';
import { frameReducer } from './reducers/frameReducer';
import { scopeReducer } from './reducers/scopeReducer';
import { windowReducer } from './reducers/windowReducer';

export const store = configureStore({
    reducer: {
        frame: frameReducer,
        windows: windowReducer,
        scopes: scopeReducer,
    },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;