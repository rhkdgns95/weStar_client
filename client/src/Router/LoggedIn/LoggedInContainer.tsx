import React, { useEffect, useState } from "react";
import LoggedInPresenter from "./LoggedInPresenter";
import { IUser } from "./LoggedInTypes";
import { useMutation } from "react-apollo";
import { EMAIL_SIGN_IN, USER_LOGGED_IN } from "./LoggedInQueries";
import { EmailSignInResponse, EmailSignInMutationVariables, UserLoggedInMutationVariables } from "../../types/resolvers";
import { toast } from "react-toastify";
import { useAppContext, EXE_LOADING_SECONDS } from "../App/AppProvider";

const UseEffects = () => {
    useEffect(() => {
    }, []);
}

const InitUser: IUser = {
    email: "",
    password: ""
};

const LoggedInContainer: React.FC<any> = () => {
    const { appState: { loading, error }, onError, onLoading, onExeLoading, exeLoading } = useAppContext();
    useEffect(() => {
        onLoading();
    }, []);
    const [ mutationEmailSignIn, { data, loading: loadingEmailSignIn }] = useMutation<EmailSignInResponse, EmailSignInMutationVariables>(EMAIL_SIGN_IN, {
        onCompleted: data => {
            const { EmailSignIn } = data;
            console.log("ON COMPLETETED");
            if(exeLoading) {
                toast.warn("Wait...");
                return;
            }
            onExeLoading();
            
            if(!EmailSignIn.ok) {
                setTimeout(() => {
                    onError(EmailSignIn.error || "");
                }, EXE_LOADING_SECONDS);
            } else {
                setTimeout(() => {
                    toast.success("OK");
                    const { token } = EmailSignIn;
                    console.log(token)
                    if(token) {
                        mutationUserLoggedIn({
                            variables: {
                                token
                            }
                        })
                    }
                }, EXE_LOADING_SECONDS);
            }
        },
        onError: data => {
            console.log("Error: ", data)
        },
    });
    const [ mutationUserLoggedIn ] = useMutation<any, UserLoggedInMutationVariables>(USER_LOGGED_IN);
    const [ loginForm, setLoginForm ] = useState<IUser>(InitUser);
    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: {name, value}} = event;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { email, password } = loginForm;
        console.log("email:", email);
        console.log("password:",password);
        mutationEmailSignIn({
            variables: {
                email,
                password
            },
        });
        if(data) {
            console.log("Data Exist");
            console.log(data);
        }
    }

    if(loadingEmailSignIn) {
        // 로그인 처리에 따른 Spinner추가하면 될것같다.
    }

    return (
        <LoggedInPresenter 
            formData={loginForm}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
        />
    );
}

export default LoggedInContainer;