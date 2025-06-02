import { TEditProfile } from "@/validators/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  id: number;
  username: string;
  email: string;
  imageURL: string | null;
  createdAt: Date;
};

export interface AuthState {
  user: TUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    updateAuth: (state, action: PayloadAction<TEditProfile>) => {
      const user = state.user;
      const { imageURL, username } = action.payload;
      if (user) {
        user.username = username;
        user.imageURL = imageURL ?? "";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, updateAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
