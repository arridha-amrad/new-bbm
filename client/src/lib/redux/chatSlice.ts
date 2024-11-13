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
  status: string | null;
  isTyping: boolean | null;
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
      state.chats = action.payload.sort(
        (a, b) =>
          new Date(b.latestMessageDate!).getTime() -
          new Date(a.latestMessageDate!).getTime()
      );
    },
    addChat: (state, action: PayloadAction<TChat>) => {
      const newChat = action.payload;
      const isChatExists = state.chats.find((c) => c.userId === newChat.userId);
      if (!isChatExists) {
        state.chats.unshift(action.payload);
      }
      state.currChat = action.payload;
    },
    updateCurrChatStatus: (state, action: PayloadAction<string>) => {
      const currChat = state.currChat;
      if (currChat) {
        currChat.status = action.payload;
      }
    },
    updateCurrChatIsTyping: (state, action: PayloadAction<boolean>) => {
      const currChat = state.currChat;
      if (currChat) {
        currChat.isTyping = action.payload;
      }
    },
    updateCurrChat: (state, action: PayloadAction<TMessage>) => {
      const { sentAt, chatId, content } = action.payload;
      const idx = state.chats.findIndex((c) => c.chatId === chatId);
      if (idx < 0) return;
      const currChat = state.chats[idx];
      currChat.lastMessage = content;
      currChat.latestMessageDate = sentAt;
      state.chats.splice(idx, 1);
      state.chats.unshift(currChat);
    },
  },
});

export const {
  setChats,
  addChat,
  setCurrChat,
  updateCurrChat,
  updateCurrChatStatus,
  updateCurrChatIsTyping,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
