import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TSearchUserResultFromApi } from "@/api/user.api";
import { TFetchMessageFromApi } from "@/api/chat.api";

export type TChat = {
  id: number | null;
  isGroup: boolean;
  name: string | null;
  participants: {
    id: number;
    username: string;
    imageURL: string | null;
  }[];
  message: {
    content: string;
    date: Date | null;
  };
};

export interface ChatState {
  chats: TChat[];
  currChat: TChat | null;
}

const initialState: ChatState = {
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
          new Date(b.message.date ?? new Date()).getTime() -
          new Date(a.message.date ?? new Date()).getTime()
      );
    },
    initNewChat: (
      state,
      action: PayloadAction<{
        users: TSearchUserResultFromApi[];
        isGroup: boolean;
      }>
    ) => {
      const newChat: TChat = {
        id: null,
        name: null,
        isGroup: action.payload.isGroup,
        message: {
          content: "",
          date: null,
        },
        participants: action.payload.users,
      };
      state.chats.unshift(newChat);
      state.currChat = newChat;
    },
    updateCurrChat: (state, action: PayloadAction<TFetchMessageFromApi>) => {
      const { sentAt, chatId, content } = action.payload;
      if (state.currChat) {
        state.currChat.id = chatId;
      }
      const idx = state.chats.findIndex((c) => c.id === chatId);
      if (idx < 0) return;
      const currChat = state.chats[idx];
      currChat.id = chatId;
      currChat.message.content = content;
      currChat.message.date = sentAt;
      state.chats.splice(idx, 1);
      state.chats.unshift(currChat);
    },
  },
});

export const { setChats, setCurrChat, updateCurrChat, initNewChat } =
  chatSlice.actions;
export const chatReducer = chatSlice.reducer;
