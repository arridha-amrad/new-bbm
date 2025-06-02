import { TSearchUserResultFromApi } from "@/api/user.api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  searchResult: TSearchUserResultFromApi[];
  searchActive: boolean;
}

const initialState: UserState = {
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
    setSearchResult: (
      state,
      action: PayloadAction<TSearchUserResultFromApi[]>
    ) => {
      state.searchResult = action.payload;
      state.searchActive = true;
    },
  },
});

export const { setSearchResult, offSearch } = userSlice.actions;
export const userReducer = userSlice.reducer;
