import { api } from "./api";
import { configureStore } from "@reduxjs/toolkit";
import HomePageData from "./slices/homePageData";
import PermanentData from "./slices/permamentData";

export const store = configureStore({
  reducer: {
    HomePageData,
    PermanentData,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
