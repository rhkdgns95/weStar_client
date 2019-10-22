import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

interface IProps {
}

const Container = styled.div`
    &.lds-ripple {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        & > div {
            position: absolute;
            border: 4px solid #e91e63;
            opacity: 1;
            border-radius: 50%;
            animation: ${keyframes => Ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            &:nth-child(2) {
                animation-delay: -0.5s;
            }
        }
    }
`;
const Ripple = keyframes`
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
`;

const Spinner: React.FC<IProps> = ({

}) => (
    <Container className={"lds-ripple"}>
        <div></div>
        <div></div>
    </Container>
);

export default Spinner;