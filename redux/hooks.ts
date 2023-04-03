import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useEkchanDispatch: () => AppDispatch = useDispatch;
export const useEkchanSelector: TypedUseSelectorHook<RootState> = useSelector;
