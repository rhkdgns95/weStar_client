import React, { useEffect } from "react";
import SignUpPresenter from "./SignUpPresenter";
import { useSignUpContext } from "./SignUpProvider";
import { toast } from "react-toastify";
import { useAppContext, EXE_LOADING_SECONDS } from "../App/AppProvider";


const SignUpContainer = () => {
    const { exeLoading, onExeLoading, appState: { error }, onError } = useAppContext();
    const { 
        mutationEmailSignUp, 
        signUpFormState
    } = useSignUpContext();
    const { email, password, phoneNumber, nickName, firstName, lastName } = signUpFormState;
    
    const handleMutationEmailSignUp = () => {
        // alert("HELLO");
        let nullInputData: string | undefined = Object.keys(signUpFormState).find(prop => signUpFormState[prop].value === "") ;
        if(nullInputData) { // input 데이터를 입력하지 않는경우.
            onError(`${nullInputData} 입력해주세요.`);
            return;
        } 
        if(exeLoading) {
            toast.warn("실행중입니다.");
            return;
        }
        onExeLoading();
        setTimeout(() => {
            console.log("시작됨.");
            console.log({...signUpFormState});
            const { email, password, phoneNumber, firstName, lastName, nickName} = signUpFormState;
            console.log("signUpFormState:Email ", signUpFormState.email.value);
            mutationEmailSignUp({
                variables: {
                    email: email.value,
                    password: password.value,
                    phoneNumber: phoneNumber.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    nickName: nickName.value
                }
            });
            // 1. 데이터 모두 입력했는지 검증.
        }, EXE_LOADING_SECONDS);
        
    }
    
    return (
        <SignUpPresenter 
            email={email}
            password={password}
            phoneNumber={phoneNumber}
            nickName={nickName}
            firstName={firstName}
            lastName={lastName}
            handleMutationEmailSignUp={handleMutationEmailSignUp}
            error={error}
        />
    );
}
export default SignUpContainer;