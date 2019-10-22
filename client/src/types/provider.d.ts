// 0. AppProvider
// 1. SignUpProvider


// [0] Start
interface IAppContext {
    appState: IAppState,
    exeLoading: boolean;
    onError: (errorMessage: string) => void;
    onLoading: () => void;
    onExeLoading: () => void;
    onUpdateTitle: (title: string) => void;
}
interface IAppState {
    loading: boolean;
    error: string | null;
}
interface IAppStateReducerAction {
    type: "OK" | "ERROR" | "RESET";
    error: string | null;
}
// [0] End

// [1] Start
interface ISignUpContext {
    mutationEmailSignUp: any;
    signUpFormState: ISignUpFormState;
}
interface IFormProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ISignUpFormState {
    email: IFormProps,
    password: IFormProps,
    firstName: IFormProps,
    lastName: IFormProps,
    phoneNumber: IFormProps,
    nickName: IFormProps
};

// [1] End