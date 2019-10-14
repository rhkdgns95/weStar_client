import React, { useEffect, useState } from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;
const Title = styled.h3`
    font-size: 17px;
`;
const Message = styled.span`
    opacity: 0;
    transition: opacity: .2s;
    &.active {
        opacity: 1;
    }
`;
const HomeButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
    border: 0;
    background-color: #e45183;
    color: white;
    transition: .2s;
    &:hover,
    &:active {
        outline: none;
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 4px 6px rgba(0,0,0, .42);
    }
`;

const LogoBox = styled.div`
    position: relative;
    margin-top: 30px;
    width: fit-content;
    padding-left: 40px;
    height: 30px;
    & > svg {
        position: absolute;
        top: 0;
        left: 0;
        transition: .3s;
        &:nth-of-type(1) {
            opacity: 1;
        }
        &:nth-of-type(2) {
            opacity: 0;
        }
    }
    &.active {
        & > svg {
            &:nth-of-type(1) {
                opacity: 0;
            }
            &:nth-of-type(2) {
                opacity: 1;
            }
        }
    }
`;

interface IProps {
    error: string;
}

const useFetch = callbackFn => {
    useEffect(() => {
        setTimeout(() => {
            callbackFn(false)
        }, 500);
    }, [])
};
const NotFoundPage: React.FC<IProps> = ({
    error="Page Not Found 404"
}) => {
    const [ loading, setLoading ] = useState(true);
    useFetch(setLoading);
    
    return (
        <Container>
            <Title>죄송합니다. 페이지를 사용할 수 없습니다.</Title>
            <Link to={"/"}>
                <HomeButton>
                    Go Home
                </HomeButton>
            </Link>
            <LogoBox className={loading ? "" : "active"}>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M23 6.066v12.065l-11.001 5.869-11-5.869v-12.131l11-6 11.001 6.066zm-21.001 11.465l9.5 5.069v-10.57l-9.5-4.946v10.447zm20.001-10.388l-9.501 4.889v10.568l9.501-5.069v-10.388zm-5.52 1.716l-9.534-4.964-4.349 2.373 9.404 4.896 4.479-2.305zm-8.476-5.541l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177z"/></svg>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M2.978 8.358l-2.978-2.618 8.707-4.74 3.341 2.345 3.21-2.345 8.742 4.639-3.014 2.68.014.008 3 4.115-3 1.634v4.122l-9 4.802-9-4.802v-4.115l1 .544v2.971l7.501 4.002v-7.889l-2.501 3.634-9-4.893 2.978-4.094zm9.523 5.366v7.875l7.499-4.001v-2.977l-5 2.724-2.499-3.621zm-11.022-1.606l7.208 3.918 1.847-2.684-7.231-3.742-1.824 2.508zm11.989 1.247l1.844 2.671 7.208-3.927-1.822-2.498-7.23 3.754zm-9.477-4.525l8.01-4.43 7.999 4.437-7.971 4.153-8.038-4.16zm-2.256-2.906l2.106 1.851 7.16-3.953-2.361-1.657-6.905 3.759zm11.273-2.052l7.076 3.901 2.176-1.935-6.918-3.671-2.334 1.705z"/></svg>
                <Message className={loading ? "" : "active"}>{ error }</Message>
            </LogoBox>
        </Container>
    )
};

export default NotFoundPage;