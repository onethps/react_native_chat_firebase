import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessagesType, RoomType } from '../types';
import { RootState } from './store';
import { UserType } from '../types/types';

type PayloadType = {
  roomId: string;
  newMessage: MessagesType;
};

const slice = createSlice({
  name: 'chatRoom',
  initialState: {
    rooms: [] as RoomType[],
    myProfile: {} as UserType,
    loading: false,
  },

  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<PayloadType>) => {
      const roomIndex = state.rooms.findIndex(
        (currentRoom) => currentRoom.roomId === action.payload.roomId,
      );
      state.rooms[roomIndex].messages.push(action.payload.newMessage);
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const chatRoomReducer = slice.reducer;

export const { setRooms, setNewMessage, setIsLoading } = slice.actions;

export const allRoomsSelector = (state: RootState) => state.chatRoom.rooms;

export const loadingChatsSelector = (state: RootState) => state.chatRoom.rooms;
