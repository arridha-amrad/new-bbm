import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TMessage = {
  id: number;
  chatId: string | null;
  content: string;
  sentAt: Date;
  userId: string;
  readers: string[];
};

export interface MessageState {
  messages: TMessage[];
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
    setMessages: (state, action: PayloadAction<TMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<TMessage>) => {
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
