import { configureStore } from '@reduxjs/toolkit';
import { frameReducer, FrameState } from './reducers/frameReducer';

export const store = configureStore({
    reducer: {
        frame: frameReducer,
    },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;