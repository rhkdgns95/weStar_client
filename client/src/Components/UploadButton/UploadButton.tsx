import React from "react";
import styled from "../../Styles/typed-components";


const Container = styled.button`
    border: 0;
    display: block;
    width: fit-content;
    min-width: 200px;
    margin: 20px auto;
    padding: 10px 15px;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    background: linear-gradient(90deg, rgba(230,136,54,1) 0%, rgba(217,53,158,1) 100%);
    transition: .4s;
    &:not(:disabled):hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 6px rgba(0,0,0,.42);
    }    
    &:focus {
        outline: none;
    }
    &:disabled {
        opacity: .7;
        cursor: auto;
    }
`;
interface IProps {
    value: string;
    handleUpload: () => any;
    disabled: boolean;
}
const UploadButton: React.FC<IProps> = ({
    value,
    handleUpload,
    disabled
}) => (
    <Container onClick={disabled ? e => {} : e => handleUpload()} disabled={disabled}>{ value }</Container>
);

export default UploadButton;