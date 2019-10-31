import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(250,250,250,.84);
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    &.active {
        display: flex;
    }
`;
const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    padding: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 6px;
    background-color: white;
    transform: scale(0);
    transition: .3s;
    transition-delay: .5s;
    &.active {
        transform: scale(1);
    }
`;
const Title = styled.h5`
    margin: 20px 0;
    text-align: center;
    font-size: 23px;
    color: #646464;
`;
const ProgressCell = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
`;
const ProgressBar = styled.div`
    position: relative;
    width: 100%;
    height: 3px;
    margin: 0 20px;
`;
const StartProgress = styled.div`
    position: relative;
    width: 45px;
    height: 45px;
`;
const EndProgress = styled.div`
    font-size: 11px;
    color: #ada3a3;
    transition: .3s;
`;
interface IProgress {
    data: number;
}
const Progress = styled.div<IProgress>`
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(11,195,183,1) 0%, rgba(24,140,214,1) 42%, rgba(178,107,8,1) 80%, rgba(255,0,0,1) 97%, rgba(177,0,0,1) 99%);
    box-shadow: 0 2px 3px rgba(0,0,0, .24);
    &::before {
        transition: .3s;
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: ${props => 100 - props.data}%;
        height: 100%;
        background-color: white;
    }
    &::after {
        transition: .3s;
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        left: ${props => props.data}%;
        transform: translate(-50%, -50%);
        width: 7px;
        height: 7px;
        background: #ff5722;
        border-radius: 50%;
    }
`;
interface IFileImg {
    src: string;
}
const FileImg = styled.div<IFileImg>`
    display: block;
    width: 100%;
    height: 100%;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 6px;
    border: .5px solid #dfdfdf;
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
`;
const ButtonBox = styled.div`
    width: 100%;
    max-width: 280px;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    margin-top: 50px;
    display: none;
    &.active {
        display: flex;
    }
`;
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: none;
    color: white;
    cursor: pointer;
    transition: .3s;
    border-radius: 30px;
    opacity: .8;
    font-size: 12px;
    &:active,
    &:focus {
        outline: none;
    }
    & svg {
        fill: white;        
    }
    &:hover {
        opacity: 1;
        box-shadow: 0 1px 2px rgba(0,0,0,.24), 0 2px 4px rgba(0,0,0,.34);
    }
`;
const HomeButton = styled(Button)`
    border-radius: 50%;
    width: 40px;
    background-color: #77c6f1;
`;
const GoBackButton = styled(Button)`
    padding: 0 20px;
    background-color: #35d7ed;
`;
const GoBoardButton = styled(Button)`
    padding: 0 20px;
    background-color: #ff9800;
`;
interface IProps {
    progressList?: Array<number>;
    imgSrcArr?: Array<string>;
    isUpload: IUploadState;
    nickName: string;
}
const ModalCreateBoard: React.FC<IProps> = ({
    progressList,
    imgSrcArr,
    isUpload,
    nickName
}) => {
    const Text: string = isUpload === "UPLOADED" ? "Upload!" : "Uploading...";
    return (
        <Container className={isUpload === "NO-UPLOAD" ? "" : "active"}>
            <Wrapper className={isUpload === "NO-UPLOAD" ? "" : "active"}>
                <Title>{Text}</Title>
                {
                    progressList && progressList.map((progress, key) => (
                        <ProgressCell key={key}>
                            <StartProgress>
                                <FileImg src={imgSrcArr ? imgSrcArr[key]: ""}/>
                            </StartProgress>
                            <ProgressBar>
                                <Progress data={progress}/>
                            </ProgressBar>
                            <EndProgress>{progress}%</EndProgress>
                        </ProgressCell>
                    ))
                }
                <ButtonBox className={isUpload === "UPLOADED" ? "active" : ""}>
                    <Link to={`/${nickName}`}>
                        <GoBackButton>돌아가기</GoBackButton>
                    </Link>
                    <Link to={`/`}>
                        <HomeButton>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 9.185l7 6.514v6.301h-14v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h18v-9.172l-9-8.375zm2 14.547h-4v-6h4v6zm10-8.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"/></svg>
                        </HomeButton>
                    </Link>
                    <Link to={"/"}>
                        <GoBoardButton>게시글 확인</GoBoardButton>
                    </Link>
                </ButtonBox>
            </Wrapper>
        </Container>
    );
}

export default ModalCreateBoard;