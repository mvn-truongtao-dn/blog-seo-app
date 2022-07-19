import { worksSlice } from './workSlice';
import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        works: worksSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;