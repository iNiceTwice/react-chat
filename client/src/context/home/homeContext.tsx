import { createContext } from "react";
import { HomeState } from "../../types";

interface HomeCtx {
    state:HomeState,
    setState:React.Dispatch<React.SetStateAction<HomeState>>,
}

export const HomeContext = createContext<HomeCtx>({} as  HomeCtx)

