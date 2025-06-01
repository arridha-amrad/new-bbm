import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "./messageSlice";
import { TUSerSearch } from "./userSlice";

export type TChat = {
  chatName: string | null;
  userId: string;
  username: string;
  imageURL: string;
  chatId: string | null;
  lastMessage: string;
  totalNotification: number;
  latestMessageDate: Date | null;
  isTyping: boolean | null;
  onlineStatus: string | null;
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
    addChat: (state, action: PayloadAction<TUSerSearch>) => {
      const { imageURL, username, id } = action.payload;
      const newChat: TChat = {
        imageURL,
        username,
        userId: id,
        chatName: null,
        lastMessage: "",
        chatId: null,
        totalNotification: 0,
        latestMessageDate: null,
        isTyping: false,
        onlineStatus: "",
      };
      const isChatExists = state.chats.find((c) => c.userId === newChat.userId);
      if (!isChatExists) {
        state.chats.unshift(newChat);
      }
      state.currChat = newChat;
    },
    updateCurrChatOnlineStatus: (state, action: PayloadAction<string>) => {
      const currChat = state.currChat;
      if (currChat) {
        currChat.onlineStatus = action.payload;
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
  updateCurrChatOnlineStatus,
  updateCurrChatIsTyping,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
