import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { notesApi } from "../features/api/apiSlice";

// const rootReducer = combineReducers({
//   [notesApi.reducerPath]: notesApi.reducer,
// });

// eslint-disable-next-line import/prefer-default-export
export const store = () => {
  configureStore({
    reducer: {
      [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(notesApi.middleware),
  });
};

setupListeners(store.dispatch);
