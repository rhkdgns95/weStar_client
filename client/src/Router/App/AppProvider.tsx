import React, { useState, useReducer, useContext } from "react";
import { toast } from "react-toastify";

interface IState {
    loading: boolean;
    error: string | null;
}
interface IAction {
    type: "OK" | "ERROR" | "RESET";
    error: string | null;
}
interface IContextProps {
    appState: IState,
    onError: (errorMessage: string) => void;
    onLoading: () => void;
}
const InitState: IState = {
    loading: true,
    error: null
};

const LOADDING_SECONDS: number = 3000;

const AppContext: React.Context<IContextProps> = React.createContext<IContextProps>({appState: {...InitState}, onError: errorMessage => {}, onLoading: () => {}});
const useAppContext = () => useContext(AppContext);

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch(action.type) {
        case "OK":
            return { ...state, loading: false, error: null };
        case "ERROR":
            return { ...state, loading: false, error: action.error };
        case "RESET":
            return { ...InitState };
        default:
            throw new Error("App Provider Wrong Type Value.");
    }
};

const useAppFetch = () => {
    const [appState, dispatchAppState] = useReducer(reducer, InitState);
    
    const onLoading = () => {
        if(appState.loading === false) {
            dispatchAppState({type: "RESET", error: null});
        }
        setTimeout(() => {
            dispatchAppState({type: "OK", error: null});
        }, LOADDING_SECONDS);
    }

    const onError = (errorMessage: string) => {
        dispatchAppState({type: "ERROR", error: errorMessage});
        toast.error(errorMessage);
        setTimeout(() => {
            dispatchAppState({type: "OK", error: null});
        }, 2000);
    }

    return {
        value: {
            appState,
            onError,
            onLoading
        }
    };
}

const AppProvider = ({
    children
}) => {
    const data = useAppFetch();
    return (
        <AppContext.Provider {...data}>
            {
                children
            }
        </AppContext.Provider>
    )
};

export { useAppContext };
export default AppProvider;