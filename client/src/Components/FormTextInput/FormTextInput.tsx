import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    margin-bottom: 7px;
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
interface IProps {
    className?: string;
    isNullEmail: boolean;
    name: string;
    type?: string;
    value: string;
    labelText: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}
const FormTextInput: React.FC<IProps> = ({
    className,
    isNullEmail,
    name,
    type="text",
    value,
    onChange,
    labelText
}) => {
    return (
        <Container className={className ? className : "form-text-input"}>
            <FormInput className={isNullEmail ? "" : "active"} type={type} name={name} id={`${name}_input_text`} autoComplete={"off"} value={value} onChange={onChange}/>
            <FormLabel htmlFor={`${name}_input_text`}>{labelText}</FormLabel>
        </Container>
    )
};

export default FormTextInput;