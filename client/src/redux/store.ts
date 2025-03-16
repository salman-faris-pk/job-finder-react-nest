import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import { rootReducer } from "./rootReducer";


export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const { dispatch } = store;
