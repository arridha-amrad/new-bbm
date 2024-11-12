import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "./messageSlice";

export type TChat = {
  chatName: string | null;
  userId: string;
  username: string;
  imageURL: string;
  chatId: string | null;
  lastMessage: string;
  totalNotification: number;
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
      const newChat = action.payload;
      const isChatExists = state.chats.find((c) => c.userId === newChat.userId);
      if (!isChatExists) {
        state.chats.unshift(action.payload);
      }
      state.currChat = action.payload;
    },
    updateChat: (state, action: PayloadAction<TMessage>) => {
      const { sentAt, chatId, content } = action.payload;
      const currChat = state.chats.find((c) => c.chatId === chatId);
      if (!currChat) return;
      currChat.lastMessage = content;
      currChat.latestMessageDate = sentAt;
    },
  },
});

export const { setChats, addChat, setCurrChat, updateChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
