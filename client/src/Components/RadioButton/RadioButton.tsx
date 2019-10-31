import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    display: flex;
`;
const InputRadio = styled.input`
    position: absolute;
    top: -100%;
    left: -100%;
    opacity: 0;
    pointer-events: none;
    z-index: -9;
    &:active,
    &:focus {
        outline: none;
    }
    &:checked {
        & ~ label {
            opacity: 1;
            color: #e47c44;
            & > .label-circle {
                border: 1px solid #e3754e;
                background-color: #e3754e;
                & > svg {
                    fill: white;
                }
            }
        }
        
    }
`;

const Label = styled.label`
    position: relative;
    padding-right: 6px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .4;
    transition: .3s;
    transition-timing-function: ease-in-out;
`;
const SquareIconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #666666;
    width: 12px;
    height: 12px;
    margin-right: 6px;
    transition: .3s;
    transition-timing-function: ease-in-out;
    padding: 1px;
    border-radius: 3px;
    & > svg {
        fill: #666666;
    }
`;
interface IProps {
    label: string;
    name: string;
    groupName: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
    defaultChecked: boolean;
}
const RadioButton: React.FC<IProps> = ({
    label,
    name,
    groupName,
    onChange,
    defaultChecked
}) => (
    <Container>
        <InputRadio type={'radio'} id={`${name}`} name={groupName} defaultChecked={defaultChecked} onChange={onChange}/>
        <Label htmlFor={`${name}`}>
            <SquareIconBox className={"label-circle"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </SquareIconBox>
            {label}
        </Label>
    </Container>
);

export default RadioButton;