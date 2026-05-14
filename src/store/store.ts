import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rewardReducer from "./rewardSlice";

// If you already have a store, just add rewardReducer to your existing reducers object.
export const store = configureStore({
    reducer: {
        reward: rewardReducer,
        // ...your other reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use these typed hooks everywhere instead of plain useDispatch / useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
