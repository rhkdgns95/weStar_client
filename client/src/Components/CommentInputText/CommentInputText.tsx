import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
`;
const TextArea = styled.textarea`
    &.height-1 {
        height: 36px;
    }
    &.height-2 {
        height: 54px;
    }
    &.height-3 {
        height: 72px;
    }
    &.height-4 {
        height: 80px;
    }
`;
const Input = styled(TextArea)`
    width: 100%;
    padding: 0 20px;
    padding-right: 5px;
    font-size: 14px;
    max-height: 80px;
    height: 18px;
    border: 0;
    resize: none;
    
    &:placeholder {
        font-size: 15px;
        color: #dfdfdf;
    }
    &:active,
    &:focus {
        outline: none;
    }
`;

const Submit = styled.button`
    opacity: .5;
    color: #2196f3;
    white-space: nowrap;
    padding: 5px;
    margin-right: 8px;
    border: 0;
    background-color: inherit;
    &:active,
    &:focus {
        outline: none;
        border: none;
    }
    &:not(:disabled) {
        opacity: 1;
        cursor: pointer;
        &:active {
            opacity: .5;
        }
    }
`;

interface IProps {
    commentInput: IUseInputResponse;
}
const CommentInputText: React.FC<IProps> = ({
    commentInput
}) => {
    const value: string = commentInput.value;
    const onChange = commentInput.onChange;
    let height: number = parseInt(value.length / 36 + ""); // 글자 텍스트 36자 넘어가면 높이조절되도록함.
    if(height > 4) height = 4; 
    const className = `height-${height}`;
    return (
        <Container>
            {/* 36자씩 높이조절 되도록하기.  */}
            <Input placeholder={"댓글 달기..."} value={value} onChange={onChange} className={className}/>
            <Submit disabled={value === "" ? true : false} onClick={e => alert("게싣굄")}>게시</Submit>
        </Container>
    )
};

export default CommentInputText;