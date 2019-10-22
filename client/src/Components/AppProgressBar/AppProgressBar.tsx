import React from "react";
import styled from "../../Styles/typed-components";
import { useAppContext } from "../../Router/App/AppProvider";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(34deg, rgba(190,22,185,1) 0%, rgba(179,55,57,1) 46%, rgba(238,231,12,1) 90%);
    &.active {
        width: 100%;
        transition: width 1.5s;
    }
`;

const AppProgressBar = () => {
    const { exeLoading } = useAppContext();
    return <Container className={exeLoading ? "active" : ""} />
};

export default AppProgressBar;