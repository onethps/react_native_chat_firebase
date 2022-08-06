import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { chatRoomReducer } from './ChatRoomReducer';
import { inializeReducer } from './InitializeReducer';
import { usersReducer } from './UsersReducer';

export const store = configureStore({
  reducer: {
    chatRoom: chatRoomReducer,
    initializeAppReducer: inializeReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
