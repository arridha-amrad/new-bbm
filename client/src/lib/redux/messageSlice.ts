import { TFetchMessageFromApi } from "@/api/chat.api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./authSlice";
import { StatementSync } from "node:sqlite";

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
    addNewMessage: (state, action: PayloadAction<TFetchMessageFromApi>) => {
      state.messages.push(action.payload);
    },
    addJustReadMessageIds: (state, action: PayloadAction<number>) => {
      state.justReadMessageIds.push(action.payload);
    },
    resetJustReadMessageIds: (state) => {
      state.justReadMessageIds = [];
    },
    addReactionToMessage: (
      state,
      action: PayloadAction<{
        id: number;
        messageId: number;
        emoji: string;
        user: TUser;
      }>
    ) => {
      const { id, emoji, messageId, user } = action.payload;
      const message = state.messages.find((m) => m.id === messageId);
      if (!message) return;
      const reaction = message.reactions.find((r) => r.value === emoji);
      if (!reaction) {
        message.reactions.push({
          id,
          users: [user],
          value: emoji,
        });
      } else {
        const hasUserGiveSameReactionIndex = reaction.users.findIndex(
          (u) => u.id === user?.id
        );
        if (hasUserGiveSameReactionIndex >= 0) {
          reaction.users.splice(hasUserGiveSameReactionIndex, 1);
          // @ts-ignore
          if (reaction.users.length === 0) {
            message.reactions = [];
          }
        } else {
          reaction.users.push(user);
        }
      }
    },
  },
});

export const {
  addNewMessage,
  addReactionToMessage,
  setMessages,
  addJustReadMessageIds,
} = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
