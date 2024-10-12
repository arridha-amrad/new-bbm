import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  username: string;
  email: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface AuthState {
  user: TUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = userSlice.actions;

export const authReducer = userSlice.reducer;
