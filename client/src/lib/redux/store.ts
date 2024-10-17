import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { chatReducer } from "./chatSlice";
import { messageReducer } from "./messageSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
