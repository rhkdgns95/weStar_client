import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;
const Wrapper = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: ${keyframes => Spin} 1s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: linear-gradient(90deg, rgba(230,136,54,1) 0%, rgba(217,53,158,1) 100%);
    opacity: .5;
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
        margin: auto;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 1px 2px rgba(0,0,0,.24), 0 2px 4px rgba(0,0,0,.42);
    }
`;
const Circle = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
`;
const CircleMiddle = styled(Circle)`
    top: 100%;
    border: 0;
`;
const Spin = keyframes`
   from { transform: rotate(0deg); }
   to { transform: rotate(360deg); }
`;

const LoadingSpinnerSM = () => (
    <Container>
        <Wrapper>
            <Circle />
            <CircleMiddle />
        </Wrapper>
    </Container>
)

export default LoadingSpinnerSM;