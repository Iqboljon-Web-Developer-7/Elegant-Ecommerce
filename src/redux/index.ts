import { api } from "./api";
import { configureStore } from "@reduxjs/toolkit";
import HomePageData from "./slices/homePageData";

export const store = configureStore({
  reducer: {
    HomePageData,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
