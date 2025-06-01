import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TUSerSearch = {
  id: string;
  username: string;
  email: string;
  imageURL: string;
  createdAt: Date;
};

export interface AuthState {
  searchResult: TUSerSearch[];
  searchActive: boolean;
}

const initialState: AuthState = {
  searchResult: [],
  searchActive: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    offSearch: (state) => {
      state.searchActive = false;
    },
    setSearchResult: (state, action: PayloadAction<TUSerSearch[]>) => {
      state.searchResult = action.payload;
      state.searchActive = true;
    },
  },
});

export const { setSearchResult, offSearch } = userSlice.actions;
export const userReducer = userSlice.reducer;
