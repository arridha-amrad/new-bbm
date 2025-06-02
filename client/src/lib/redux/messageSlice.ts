import { TFetchMessageFromApi } from "@/api/chat.api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  messages: TFetchMessageFromApi[];
  justReadMessageIds: number[];
}

const initialState: MessageState = {
  messages: [],
  justReadMessageIds: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<TFetchMessageFromApi[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<TFetchMessageFromApi>) => {
      state.messages.push(action.payload);
    },
    addJustReadMessageIds: (state, action: PayloadAction<number>) => {
      state.justReadMessageIds.push(action.payload);
    },
    resetJustReadMessageIds: (state) => {
      state.justReadMessageIds = [];
    },
  },
});

export const { addMessage, setMessages, addJustReadMessageIds } =
  messageSlice.actions;
export const messageReducer = messageSlice.reducer;
