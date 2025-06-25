import { createSlice } from "@reduxjs/toolkit";

interface HomePageState {
  isShopCollectionInView: boolean
}

const initialState: HomePageState = {
  isShopCollectionInView: false,
};

const HomePageData = createSlice({
  name: "homePageData",
  initialState,
  reducers: {
    setShopCollectionView: (state, action ) => {
      state['isShopCollectionInView'] = action.payload
    }
  },
});

export const { setShopCollectionView } = HomePageData.actions;
export default HomePageData.reducer;
