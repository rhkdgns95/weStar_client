import React, { useContext } from "react";
import { IUser } from "./LoggedInTypes";
import styled from "../../Styles/typed-components";
import FacebookLoginButton from "../../Components/FacebookLoginButton";
import MainScreen from "../../Components/MainScreen";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 900px;
    height: 100vh;
    @media(max-width: 450px) {
        align-items: flex-start;
    }
`;
const MainContainer = styled.div`
    
    @media(max-width: 450px) {
        width: 100%;
    }
`;

const MainScreenExtended = styled(MainScreen)`
    @media(max-width: 875px) {
        display: none;
    }
`;

const LoginBar = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #dfdfdf;
    padding: 30px 40px;
    background-color: white;
    @media(max-width: 450px) {
        background-color: inherit;
        border: none;
    }
`;
const Title = styled.h5`
    margin-top: 0;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    pointer-events: none;
    @media(max-width: 450px) {
        margin-top: 30px;
    }
`;
const Form = styled.form`
    @media(max-width: 450px) {
        width: 100%;
    }
`;
const FormInput = styled.input`
    width: 250px;
    padding: 12px 9px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    margin: 0;
    font-size: 16px;
    // transition: font-size .2s, border .2s;
    color: #5a5a5a;
    background-color: #f9f9f9;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border:1px solid darkgray;
    }
    &.active {
        display: flex;
        align-items: flex-end;
        padding-top: 22px;
        padding-bottom: 5px;
        font-size: 13px;
        & ~ label {
            top: 30%;
            font-size: 9px;
        }
    }
    @media(max-width: 450px) {
        width: 100%;
    }
`;
const FormInputWrapper = styled.div`
    position: relative;
    margin-bottom: 7px;
`;
const FormLoginButton = styled.button`
    border-radius: 5px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 10px;
    color: white;
    background-color: #415df5;
    border: 0;
    padding: 7px;
    opacity: .3;
    transition: opacity .3s;
    &.active {
        opacity: 1;
        cursor: pointer;
    }
`;
const FormLabel = styled.label`
    position: absolute;
    top: 50%;
    left: 9px;
    transform: translateY(-50%);
    font-size: 12px;
    color: #888888;
    transition: top .3s, font-size .25s;
`;
const Line = styled.span`
    position: relative;
    width: 100%;
    text-align: center;
    color: #797979;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    &::after,
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 100px;
        height: 1px;
        background-color: #dfdfdf;
    }
    &::after {
        left: auto;
        right: 0;
    }
`;
const FindPasswordButton = styled.a`
    position: relative;
    margin-top: 5px;
    font-size: 12px;
    cursor: pointer;
    color: #7a799c;
    &::after {
        content: "";
        position: absolute;
        top: 101%;
        left: 0;
        height: 2px;
        border-top-right-radius: 50%;
        width: 0;
        background-color: black;
        transition: .4s ease-in-out;
    }
    &:hover {
        &::after {
            width: 100%;
            background-color: #2196f3;
            border-radius: 0;
        }
    }
`;
const SignBar = styled.div`
    background-color: white;
    border: 1px solid #dfdfdf;
    margin-top: 10px;
    padding: 20px;
    text-align: center;
    @media(max-width: 450px) {
        background-color: inherit;
        border: none;
    }
`;
const SignText = styled.span`
    font-size: 13px;
    color: #636363;
`;
const SignLink = styled.a`
    margin-left: 5px;
    color: ${props => props.theme.blueColor};
    font-weight: 500;
`;
interface IProps {
    formData: IUser;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error: string | null;
}
const LoggedInPresenter: React.FC<IProps> = ({
    formData: { email, password },
    onInputChange,
    onSubmit,
    error
}) => {
    const isNullEmail: boolean = email === "";
    const isNullPassword: boolean =  password === "";
    const isOkLoginButton: boolean = !isNullEmail && !isNullPassword;
    return (
        <Container>
            <MainScreenExtended className="main-screen"/>
            <MainContainer className={error ? "error" : "working"}>
                <LoginBar>
                    <Title className="font-app-title">WeStargram</Title>
                    <Form onSubmit={onSubmit}>
                        <FormInputWrapper>
                            <FormInput className={isNullEmail ? "" : "active"} type="text" name="email" id="form_email" value={email} onChange={onInputChange} autoComplete={"off"}/>
                            <FormLabel htmlFor="form_email">전화번호 사용자 이름 또는 이메일</FormLabel>
                        </FormInputWrapper>
                        <FormInputWrapper>
                            <FormInput className={isNullPassword ? "" : "active"} type="password" name="password" id="form_password" value={password} onChange={onInputChange}/>
                            <FormLabel htmlFor="form_password">비밀번호</FormLabel>
                        </FormInputWrapper>
                        {/* <input type="submit" value={"전송하기"}/> */}
                        <FormLoginButton className={isOkLoginButton ? "active" : ""} disabled={!isOkLoginButton} type={"submit"}>로그인</FormLoginButton>
                    </Form>
                    <Line>또는</Line>
                    <FacebookLoginButton/>
                    <FindPasswordButton href="/find-password">비밀번호를 잊으셨나요?</FindPasswordButton>
                </LoginBar>
                <SignBar>
                    <SignText>
                        계정이 없으신가요?
                        <SignLink href="/sign-up">가입하기</SignLink>
                    </SignText>
                </SignBar>
            </MainContainer>
        </Container>
    )
};

export default LoggedInPresenter;
