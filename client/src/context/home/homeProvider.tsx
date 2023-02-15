import { useState, useEffect } from "react"
import { HomeContext } from "./homeContext"
import { HomeState } from "../../types";

interface Props {
     children: JSX.Element | JSX.Element[];
}

const initialState:HomeState = {
    authOption:null
}

export const HomeProvider = ({children}:Props) => {
    const [ state, setState ] = useState<HomeState>(initialState)
    
    return (
        <HomeContext.Provider
            value={{
                state,
                setState
            }}
        >
            { children }
        </HomeContext.Provider>
    )
}