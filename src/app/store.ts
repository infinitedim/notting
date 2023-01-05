import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { LocalStorage } from "@/utils";

import { AuthReducer } from "@/features/auth";
import AuthServices from "@/services/auth";

const reducers = combineReducers({
  auth: AuthReducer,
  [AuthServices.reducerPath]: AuthServices.reducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      AuthServices.middleware,
    ],
    devTools: process.env.NODE_ENV !== "production",
    ...options,
  });

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  const { auth } = store.getState();

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (auth.token) {
    LocalStorage.set("token", auth.token);
  } else {
    LocalStorage.set("token", "");
  }
});
