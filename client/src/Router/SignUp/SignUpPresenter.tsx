import React from "react";
import styled from "../../Styles/typed-components";
import LoginBar from "../../Components/LoginBar";
import FormTextInput from "../../Components/FormTextInput";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-flow: column;
`;
const Title = styled.h5`
    margin: 0;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    pointer-events: none;
    @media(max-width: 450px) {
        margin-top: 30px;
    }
`;
const SubTitle = styled.h5`
    text-align: center;
    font-size: 17px;
    font-weight: 400;
    margin: 15px 0 35px 0;
    color: #acacac;
`;
const BottomTitle = styled.h5`
    margin-top: 20px;
    font-size: 13px;
    width: 220px;
    font-weight: 400;
    margin: 0 auto;
    color: #797979;
`;
const StrongText = styled.span`
    font-weight: bold;
`;
const Form = styled.form`
    margin-bottom: 20px;
`;
const FormButton = styled.button`
    border-radius: 3px;
    background-color: ${props => props.theme.blueColor};
    color: white;
    border: none;
    outline: none;
    width: 100%;
    padding: 6px;
    margin-top: 5px;
    cursor: pointer;
`;
const BottomLoginBar = styled(LoginBar)`
    width: 332px;
    padding: 20px;
    margin-top: 15px;
    font-size: 13px;
`;
const Text = styled.span`
    color: ${props => props.theme.blueColor};
`;
interface IProps {
    error: string | null;
    email: IFormProps;
    password: IFormProps;
    phoneNumber: IFormProps;
    nickName: IFormProps;
    firstName: IFormProps;
    lastName: IFormProps;
    handleMutationEmailSignUp: () => any;
}
const SignUpPresenter: React.FC<IProps> = ({
    error,
    email,
    password,
    phoneNumber,
    nickName,
    firstName,
    lastName,
    handleMutationEmailSignUp
}) => (
    <Container>
        <LoginBar className={error ? "error" : ""}>
            <Title className="font-app-title">WeStargram</Title>    
            <SubTitle>친구들의 사진과 동영상을<br /> 보려면 가입하세요.</SubTitle>
            <Form onSubmit={ e => { e.preventDefault(); }}>
                <FormTextInput 
                    isNullEmail={email.value === ""}
                    labelText={"Email"}
                    onChange={email.onChange}
                    value={email.value}
                    name={"email"}
                />
                <FormTextInput 
                    isNullEmail={password.value === ""}
                    labelText={"Password"}
                    type={"password"}
                    onChange={password.onChange}
                    value={password.value}
                    name={"password"}
                />
                <FormTextInput 
                    isNullEmail={firstName.value === ""}
                    labelText={"First Name"}
                    onChange={firstName.onChange}
                    value={firstName.value}
                    name={"firstName"}
                />
                <FormTextInput 
                    isNullEmail={lastName.value === ""}
                    labelText={"Last Name"}
                    onChange={lastName.onChange}
                    value={lastName.value}
                    name={"lastName"}
                />
                <FormTextInput 
                    isNullEmail={nickName.value === ""}
                    labelText={"Nickname"}
                    onChange={nickName.onChange}
                    value={nickName.value}
                    name={"nickName"}
                />
                <FormTextInput 
                    isNullEmail={phoneNumber.value === ""}
                    labelText={"Phone Number"}
                    onChange={phoneNumber.onChange}
                    value={phoneNumber.value}
                    name={"phoneNumber"}
                />
                <FormButton onClick={e => { handleMutationEmailSignUp(); }}>가입하기</FormButton>
            </Form>
            <BottomTitle>가입하면 Instagram의  
                <StrongText> 약관</StrongText>, 
                <StrongText> 데이터 정책</StrongText> 및 
                <StrongText> 쿠키 정책</StrongText>에 동의하게 됩니다.
            </BottomTitle>
        </LoginBar>
        <BottomLoginBar className={error ? "error" : "bottom-login-bar"} >
            계정이 있으신가요 ? <Link to="/" style={{display: "inline-block"}}><Text>로그인</Text></Link>
        </BottomLoginBar>
    </Container>
);

export default SignUpPresenter;