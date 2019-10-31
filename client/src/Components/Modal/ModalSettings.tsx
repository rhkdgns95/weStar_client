import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    transform: scale(0) rotate(360deg);
    background-color: rgba(0,0,0,.44);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-timing-function: ease-in-out;
    border-radius: 50%;
    height: 0;
    &.active {
        transition: .5s;
        transform: scale(1)  rotate(0deg);
        border-radius: 0;
        height: 100%;
    }
`;

const Wrapper = styled.div`
    display: block;
    opacity: 0;
    background-color: white;
    transition: .3s;
    &.active {
        opacity: 1;
    }
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
`;
const Item = styled.a`
    display: block;
    text-align: center;
    padding: 15px 20px;
    min-width: 400px;
    font-size: 15px;
    &:not(:nth-last-of-type(1)) {
        border-bottom: 1px solid #dfdfdf;
    }
`;

interface IProps {
    className: string;
    handleModalClick: (data: boolean) => {};
}
const ModalSettings: React.FC<IProps> = ({
    className,
    handleModalClick
}) => (
    <Container className={className} onClick={e => handleModalClick(false)}>
        <Wrapper className={className}>
            <Item>회원정보수정</Item>
            <Item href={"/create_board"}>글쓰기</Item>
            <Item>로그아웃</Item>
        </Wrapper>
    </Container>
);

export default ModalSettings;