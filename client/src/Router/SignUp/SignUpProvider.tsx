import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import { EMAIL_SIGNUP } from "./SignUpQueries";
import { EmailSignUpMutationResponse, EmailSignUpMutationVariables, UserLoggedInMutationVariables } from "../../types/resolvers";
import { useAppContext } from "../App/AppProvider";
import { USER_LOGGED_IN } from "../LoggedIn/LoggedInQueries";


const useInput = (defaultValue: string) => {
    const [value, setValue] = useState<string>(defaultValue);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value)
    }
    return {
        value,
        onChange
    };
}

const initContext: ISignUpContext = {
    mutationEmailSignUp: () => {},
    signUpFormState: {
        email: {onChange: () => {}, value: ""},
        password: {onChange: () => {}, value: ""},
        firstName: {onChange: () => {}, value: ""},
        lastName: {onChange: () => {}, value: ""},
        phoneNumber: {onChange: () => {}, value: ""},
        nickName: {onChange: () => {}, value: ""}
    }
};

const SignUpContext: React.Context<ISignUpContext> = React.createContext<ISignUpContext>(initContext);
const useSignUpContext = () => useContext(SignUpContext);

const useSignUpFormState = () => {
    const email = useInput("");
    const password = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const phoneNumber = useInput("");
    const nickName = useInput("");

    return {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        nickName
    };
}

const useSignUpFetch = () => {
    const { onError } = useAppContext();
    const [ mutationEmailSignUp ] = useMutation<EmailSignUpMutationResponse, EmailSignUpMutationVariables>(EMAIL_SIGNUP, {
        onCompleted: data => mutationEmailSignUpCompleted(data),
        onError: data => {
            console.log("OnERror! ", data);
        }
    });
    
    const [ mutationEmailSignIn ] = useMutation<any, UserLoggedInMutationVariables>(USER_LOGGED_IN, {
        onCompleted:data => {
            // 로그인 성공하면 페이지 Redirect시키기.
            // location.pathname = "/";
        }
    });
    const mutationEmailSignUpCompleted = (data: EmailSignUpMutationResponse) => {
        console.log("onMutationEMailSignUpCompleted! ", data);
        const { ok, error, token } = data.EmailSignUp;
        if(ok && token) { 
            mutationEmailSignIn({
                variables: {
                    token
                }
            });
        } else {
            onError(error!);
        }
    }
    
    const signUpFormState: ISignUpFormState = useSignUpFormState();
    
    return {
        mutationEmailSignUp,
        signUpFormState    
    };
}

const SignUpProvider: React.FC<any> = ({
    children
}) => {
    const value = useSignUpFetch();
    const { onUpdateTitle } = useAppContext();
    onUpdateTitle("WeStar - Signup");
    return (
        <SignUpContext.Provider value={{...value}}>
            {
                children
            }
        </SignUpContext.Provider>
    )
};

export { useSignUpContext };
export default SignUpProvider;