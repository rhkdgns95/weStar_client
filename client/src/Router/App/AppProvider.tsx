import React, { useState, useReducer, useContext } from "react";
import { toast } from "react-toastify";

const InitState: IAppState = {
    loading: true,
    error: null
};
const InitAppContext: IAppContext = {
    appState: {...InitState},
    exeLoading: false,
    onError: errorMessage => {}, 
    onLoading: () => {},
    onExeLoading: () => {},
    onUpdateTitle: () => {}
}
const LOADDING_SECONDS: number = 3000;
const EXE_LOADING_SECONDS: number = 2000;

const AppContext: React.Context<IAppContext> = React.createContext<IAppContext>(InitAppContext);
const useAppContext = () => useContext(AppContext);

const reducer: React.Reducer<IAppState, IAppStateReducerAction> = (state, action) => {
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
    const [exeLoading, setExeLoading] = useState<boolean>(false);

    const onExeLoading = () => {
        if(exeLoading) {
            toast.error("실행중입니다.");
            return;
        }
        setExeLoading(true);
        setTimeout(() => {
            setExeLoading(false);
        }, EXE_LOADING_SECONDS);
    }
    const onUpdateTitle = (title: string) => {
        document.title = title;
    }

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
            exeLoading,
            onError,
            onLoading,
            onExeLoading,
            onUpdateTitle
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

export { LOADDING_SECONDS, EXE_LOADING_SECONDS, useAppContext };
export default AppProvider;