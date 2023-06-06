import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { auth } from "../features/auth";
import { editBtn } from "../features/editBtn";
import { useAPI } from "../hooks/useAPI";
import { user } from "../features/user";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: auth.reducer,
  editBtn: editBtn.reducer,
  user: user.reducer,
  [useAPI.reducerPath]: useAPI.reducer,
});

export const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(useAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export let persistor = persistStore(store);

