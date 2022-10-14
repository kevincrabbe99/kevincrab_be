import { configureStore } from '@reduxjs/toolkit';
import { frameReducer, FrameState } from './reducers/frameReducer';
import { windowReducer } from './reducers/windowReducer';

export const store = configureStore({
    reducer: {
        frame: frameReducer,
        windows: windowReducer
    },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;