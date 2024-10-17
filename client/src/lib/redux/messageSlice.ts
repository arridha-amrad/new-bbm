import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TMessage = {
  id: string;
  chatId: string | null;
  content: string;
  sentAt: Date;
  userId: string;
};

export interface MessageState {
  messages: TMessage[];
}

const initialState: MessageState = {
  messages: [],
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
  },
});

export const { addMessage, setMessages } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
