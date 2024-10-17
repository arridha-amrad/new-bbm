import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TChat = {
  id: string;
  chatId: string | null;
  username: string;
  lastMessage: string;
  totalNotification: number;
  imageURL: string;
  latestMessageDate: Date | null;
};

export interface AuthState {
  chats: TChat[];
  currChat: TChat | null;
}

const initialState: AuthState = {
  chats: [],
  currChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrChat: (state, action: PayloadAction<TChat>) => {
      state.currChat = action.payload;
    },
    setChats: (state, action: PayloadAction<TChat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<TChat>) => {
      state.chats.unshift(action.payload);
      state.currChat = action.payload;
    },
  },
});

export const { setChats, addChat, setCurrChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
