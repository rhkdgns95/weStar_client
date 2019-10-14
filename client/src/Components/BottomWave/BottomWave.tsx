import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";

const Container = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;
`;
interface IWave {
    motion: "UP" | "DOWN"
}
const Wave = styled.div<IWave>`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ${props => props.motion === "UP" ? "top" : "bottom" }: 50px;
    width: 100vw;
    height: 100vw;
    border-radius: 43%;
    // background: linear-gradient(0deg, rgba(34,40,195,1) 0%, rgba(204,121,131,1) 0%, rgba(219,143,168,1) 37%, rgba(253,45,144,1) 75%);
    background-color: #efd8e2;
    z-index: 2;
`;

const WaveItemFirst = styled(Wave)`
    animation: ${keyframes => Drift} 9s infinite linear;
`;
const WaveItemSecond = styled(Wave)`
    animation: ${keyframes => Drift} 3s infinite linear;
    // background-color: #39eccb;
    opacity: .9;
    z-index: 1;
`;
const WaveItemThird = styled(Wave)`
    animation: ${keyframes => Drift} 5s infinite linear;
`
const Drift = keyframes`
    from {
        transform: translateX(-50%) rotate(0deg);
    }
    from {
        transform: translateX(-50%) rotate(360deg);
    }
`;
interface IProps {
    className?: string;
    motion: "UP" | "DOWN";
}
const BottomWave: React.FC<IProps> = ({
    className,
    motion
}) => (
    <Container className={className}>
        <WaveItemFirst motion={motion}/>    
        <WaveItemSecond motion={motion}/>
        <WaveItemThird motion={motion}/>
    </Container>
);

export default BottomWave;