import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const ChangeKeyFrames_1 = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(.9);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%);
        opacity: 0;
    }
`;
const FillKeyFrames = keyframes`
    from {
        fill-opacity: 1;
    }
    to {
        fill-opacity: .3;
    }
`;
const Container = styled.div`
    position: relative;
    margin: 0 -95px
    & svg {
        fill: lightsteelblue;
        animation: ${FillKeyFrames} 3s ease-in-out alternate infinite;
    }
`;
const ItemBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 330px;
    height: 460px;
    margin-top: 20px;
    background-color: white;
    overflow: hidden;
    box-sizing: border-box;
    border: 4px solid #dfdfdf;
    & > div {
        &:nth-of-type(1) {
            animation: ${ChangeKeyFrames_1} ease infinite;
            animation-delay: 0.0s;
            animation-duration: 8s;
        }
        &:nth-of-type(2) {
            animation: ${ChangeKeyFrames_1} ease infinite;
            animation-delay: 3s;
            animation-duration: 12s;
        }
        &:nth-of-type(3) {
            animation: ${ChangeKeyFrames_1} ease infinite;
            animation-delay: 6s;
            animation-duration: 12s;
        }
        &:nth-of-type(4) {
            animation: ${ChangeKeyFrames_1} ease infinite;
            animation-delay: 9s;
            animation-duration: 12s;
        }
    }
`;
const ItemCell = styled.div`
    position: absolute;
    top: inherit;
    left: inherit;
    width: 100%;
    height: 100%;
    opacity: 0;
`;

const Item = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

interface IProps {
    className: string;
}
const MainScreen: React.FC<IProps> = ({
    className
}) => (
    <Container className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 24 24"><path d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z"/></svg>
        <ItemBox>
            <ItemCell>
                <Item src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"/>
            </ItemCell>
            <ItemCell>
                <Item src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg"/>
            </ItemCell>
            <ItemCell>
                <Item src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg"/>
            </ItemCell>
            <ItemCell>
                <Item src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"/>
            </ItemCell>
        </ItemBox>
    </Container>
);

export default MainScreen;