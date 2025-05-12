import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomePageState {
  slides: Array<any>;
  collections: Array<any>;
  products: Array<any>;
}

type KeyType = keyof HomePageState;

const initialState: HomePageState = {
  slides: [],
  collections: [],
  products: [],
};

const HomePageData = createSlice({
  name: "homePageData",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{ key: KeyType; value: Array<any> }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { add } = HomePageData.actions;
export default HomePageData.reducer;
