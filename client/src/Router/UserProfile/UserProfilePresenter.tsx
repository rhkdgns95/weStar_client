import React from "react";
import Profile from '../../Components/Profile';
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import Photo from "../../Components/Photo";
import BottomWave from "../../Components/BottomWave";

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    width: calc(100% - 40px);
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 930px;
    @media(max-width: 500px) {
        width: 100%;
    }
`;
const Header = styled.div`
    padding: 50px 0;
    @media(max-width: 800px) {
        padding: 35px 0;
    }
`;
const Selector = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    border-top: .5px solid #dfdfdf;
    @media(max-width: 800px) {
        justify-content: space-around;
    }
`;
const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 5px;
    font-size: 12px;
    border: 0;
    background-color: transparent;
    transition: border .3s;
    cursor: pointer;
    color: darkgray;
    margin-right: 15px;
    & svg {
        margin-right: 10px;
        fill: darkgray;
    }
    &:focus {
        outline: none;
    }
    &.active {
        color: black;
        svg {
            fill: black;
        }
        &::after {
            content: "";
            position: absolute;
            top: 0;
            transform: translateY(-50%);
            width: 100%;
            height: 1px;
            background-color: #696969;
        }
    }
    @media(max-width: 800px) {
        svg {
            width: 23px;
            height: 23px;
        }
        &.active {
            svg {
                fill: ${props => props.theme.blueColor};
            }
        }
        &::after {
            display: none;
        }
    }
`;
const SelectorButton = styled(Button)``;
const Text = styled.span`
    @media(max-width: 800px) {
        display: none;
    }
`;
const Content = styled.article``;
const PhotoContainer = styled.div`
    display: none;
    &.active {
        display: flex;
        flex-flow: row wrap;
    }
`;
const PhotoExtended = styled(Photo)`
    width: 32%;
    &:nth-of-type(3n + 2) {
        margin: 0 2%;
    }
    &:nth-of-type(n) {
        margin-bottom: 2%;
    }
    @media(max-width: 800px) {
        width: 33%;
        &:nth-of-type(3n +2) {
            margin: 0 .5%;
        }
        &:nth-of-type(n) {
            margin-bottom: .5%;
        }
    }
`;
const SelectorLinker = styled(Link)`
    @media(max-width: 800px) {
        display: flex;
        width: 100%;
        justify-content: center;
    }
`;
const BottomWaveExtended = styled(BottomWave)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    transform: translateY(-100%);
    opacity: .3;
`;
interface IProps {
    isSelf: boolean;
    profilePhoto: string;
    nickName: string;
    fullName: string;
    selector: string;
    boards: Array<any>;
}
const UserProfilePresenter: React.FC<IProps> = ({
    isSelf,
    profilePhoto,
    nickName,
    fullName,
    selector,
    boards
}) => (
    <Container>
        <Wrapper>
            <Header>
                <Profile 
                    profilePhoto={profilePhoto}
                    nickName={nickName}
                    name={fullName}
                    isSelf={isSelf}
                />
            </Header>
            <Selector>
                <BottomWaveExtended motion={"UP"}/>
                <SelectorLinker to={`/${nickName}`}>
                    <SelectorButton className={selector === "board" ? "active" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M10 15c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm7.8-5v14h-18v-14h18zm-2 2h-14v10h14v-10zm-6.462-9.385l2.244 5.385h2.167l-3.334-8-16.615 6.923 4 9.663v-5.265l-1.384-3.321 12.922-5.385z"/></svg>
                        <Text>게시물</Text>
                    </SelectorButton>
                </SelectorLinker>
                <SelectorLinker to={`/${nickName}/tagged`}>
                    <SelectorButton className={selector === "tagged" ? "active" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12.878 2h-8.877l-.001 9.014 10.973 11.123 9.026-9.027-11.121-11.11zm-5.615 3.263c.684-.684 1.791-.684 2.475 0 .684.683.684 1.791 0 2.474s-1.791.684-2.475 0-.684-1.791 0-2.474zm7.719 14.036l-6.225-6.349 6.121-6.122 6.293 6.283-6.189 6.188zm-3.379 2.265l-1.369 1.436-10.234-10.257.001-7.743h1.999v6.891l9.603 9.673z"/></svg>
                        <Text>태그됨</Text>
                    </SelectorButton>
                </SelectorLinker>
            </Selector>
            <Content>
                <PhotoContainer className={selector === "board" ? "active" : ""}>
                    {
                        boards.map(board => <PhotoExtended isMany={board.board.files.length > 0} key={board.board.id} imgPath={board.board.files[0] ? board.board.files[0].url : undefined}/>)
                    }
                </PhotoContainer>
                    
                {
                    selector
                }
            </Content>
        </Wrapper>
    </Container>
);

export default UserProfilePresenter