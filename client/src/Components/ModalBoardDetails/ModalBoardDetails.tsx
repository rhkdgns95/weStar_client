import React, { useState, useEffect } from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import { GetBoardDetailsResponse } from "../../types/resolvers";
import { useAppContext } from "../../Router/App/AppProvider";
import LoadingSpinnerSM from "../LoadingSpinnerSM";
import { useUserProfileContext } from "../../Router/UserProfile/UserProfileProvider";
import BottomMenu from "../BottomMenu";
import CommentInputText from "../CommentInputText";

const Container = styled.div`
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LinkBack = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
const Wrapper = styled.div`
    position: relative;
    width: calc(100% - 40px);
    max-width: 930px;
    height: 100%;
    max-height: 650px;
    display: flex;
    background-color: white;
`;
const SlideScreen = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 100%;
    overflow: hidden;
`;
interface ISlideProps {
    currentStep: number;
    photoCnt: number;
}
const SlideWrapper = styled.div<ISlideProps>`
    position: absolute;
    top: 0;
    left: -${props => props.currentStep * ((props.photoCnt - 1) * 100)}%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: ${props => props.photoCnt * 100}%;
    transition: left .3s;
    & > div {
        width: ${props => 100 / props.photoCnt}%;
        // width: 600px;
        height: 100%;
    }
`;
interface IPhoto {
    imgSrc: string;
}
const Photo = styled.div<IPhoto>`
    background: url("${props => props.imgSrc}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const LargeBtn = styled(Link)`
    position: absolute;
    top: 50%; 
    transform: translateY(-50%);
    left: -40px;
    padding: 8px;
    transition: .3s;
    border-radius: 50%;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
    &:active,
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: rgba(0,0,0,.24);
    }
    & > svg {
        fill: white;
    }
`;
const BtnLink = styled(Link)`

`;
const LargeLeftBtn = styled(LargeBtn)`
    
`;
const LargeRightBtn = styled(LargeBtn)`
    left: auto;
    right: -40px;
    transform: translateY(-50%) rotateZ(-180deg);
`;
const SmallBtn = styled.button`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    transition: .3s;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: .5px solid white;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: rgba(250,250,250,.3);
    }
    
    & > svg {
        fill: white;
    }
`;

const SmallLeftBtn = styled(SmallBtn)`

`;
const SmallRightBtn = styled(SmallBtn)`
    left: auto;
    right: 10px;
    transform: translateY(-50%) rotateZ(-180deg);
`;

const BoardInfo = styled.div`
    display: flex;
    width: 330px;
    height: 100%;
    flex-flow: column;
    overflow: hidden;
`;
const BoardTitle = styled.div`
    display: flex;
    padding: 15px 20px;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
`;
const UserNickname = styled(Link)`
    margin-left: 15px;
`;
const UserProfileLink = styled(Link)`
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
`;
interface IUserProfile {
    imgUrl?: string;
}
const UserProfile = styled.div<IUserProfile>`
    background: url("${props => props.imgUrl}");
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;   
`;
const BoardContents = styled.div`
    padding: 20px;
    position: relative;
    max-height: 500px;
    overflow-y: scroll;
    box-sizing: content-box;
    width: calc(100% - 20px);
`;
const BoardContentsItem = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding-left: 50px;
    padding-bottom: 10px;
    & > .comments-profile {
        position: absolute;
        top: 0;
        left: 0;
    }
`;
const Comments = styled.span`
    padding: 5px;
    font-size: 13.5px;
    color: #676767;
`;
const CommentUser = styled(Link)`
    font-weight: bold;
    margin-right: 3px;
    color: black;
`;
const CommentDate = styled.span`
    display: block;    
    color: #dfdfdf;
    margin-top: 5px;
    color: #ababab;
`;

const BoardFavorites = styled.div`

`;
const BoardUpdated = styled.div`

`;
const WriterBox = styled.div`
    
`;
interface IProps {
    boards: Array<any>;
    toggleModal: (boardId: null | number) => any;
    nickName: string;
    boardDetailsData: GetBoardDetailsResponse | undefined,
    boardDetailsLoading: boolean,
}
const ModalBoardDetails: React.FC<IProps> = ({
    boards,
    toggleModal,
    nickName,
    boardDetailsData,
    boardDetailsLoading
}) => {
    const isLoading: boolean = boardDetailsLoading || !boardDetailsData;
    const [photoItemStep, setPhotoItemStep] = useState<number>(0);
    const { onClickBoard, commentInput } = useUserProfileContext();    
    /**
     *  뒤로가기 문제
     * 
     *  하나의 게시글에서 다른 이미지를 계속클릭했을 경우,
     *  pohitiItemStep은 증가할것이다.
     *  이때 뒤로가기를 하고 다른 게시글을 읽으면 다시
     *  photoItemStep이 0을가리키는게아니라 이전에 읽고있던 photoItemStep을 가리킨다.
     *  이 문제를 해결하기위해서 isLoading이 될때마다, photoItemStep값을 초기화 한다.
     */
    useEffect(() => {
        setPhotoItemStep(0); // 
        commentInput.onInit();
    },  [ isLoading ]);
    console.log("photoItemStep: ", photoItemStep);
    
    if(boardDetailsLoading || !boardDetailsData || boards.length == 0) {
        return <LoadingSpinnerSM />
    }

    const { GetBoardDetails: { board: { id, files, updatedAt }}} = boardDetailsData;
    
    const boardsLength = boards.length;
    let prevBoard: any = null;
    let nextBoard: any = null;

    boards.find((board, key) => {
        if(board.id === id) {
            if(key > 0) {
                prevBoard = boards[key - 1];
            }
            if(key < boardsLength - 1){
                nextBoard = boards[key + 1];
            } 
        }
    });
    const onPhotoItemStep = (step: number) => {
        if(step < 0 || step >= files.length) {
            return;
        }
        setPhotoItemStep(step);
    }
   
    return (
        <Container >
            <LinkBack to={`/${nickName}`} onClick={e => { toggleModal(null); commentInput.onInit(); }} />
            <Wrapper>
                <SlideScreen>
                    <SlideWrapper photoCnt={files.length} currentStep={photoItemStep}>
                        {
                            files.map((file, key) => <Photo imgSrc={file.url} key={key}/>)
                        }
                    </SlideWrapper>
                    {
                        photoItemStep > 0 && (
                            <SmallLeftBtn onClick={e => onPhotoItemStep(photoItemStep - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                            </SmallLeftBtn>
                        )
                    }
                    {
                        photoItemStep < files.length - 1 && (
                            <SmallRightBtn onClick={e => onPhotoItemStep(photoItemStep + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg> 
                            </SmallRightBtn>
                        ) 
                    }
                </SlideScreen>
                <BoardInfo>
                    <BoardTitle>
                        <UserProfileLink to={`/${nickName}`}>
                            <UserProfile imgUrl={"https://scontent-icn1-1.cdninstagram.com/vp/30ddfbc60ab9924929498a8df578770a/5E5EFBA1/t51.2885-19/s150x150/49549840_371647546718802_4148861725589897216_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"} />
                        </UserProfileLink>
                        <UserNickname to={`/${nickName}`}>{ nickName }</UserNickname>
                    </BoardTitle>
                    <BoardContents>
                        <BoardContentsItem>
                            {/* 1. 수정할것 User link를 Comments남긴 유저아이디의 nickName의 link를 걸어두도록 하기.*/}
                            <UserProfileLink className={"comments-profile"} to={`/${nickName}`}>
                                <UserProfile imgUrl={"https://scontent-icn1-1.cdninstagram.com/vp/30ddfbc60ab9924929498a8df578770a/5E5EFBA1/t51.2885-19/s150x150/49549840_371647546718802_4148861725589897216_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"} />
                            </UserProfileLink>
                            <Comments>
                                <CommentUser to={`/${nickName}`}>{nickName}</CommentUser>
                                해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!
                                <CommentDate>25주전</CommentDate>
                            </Comments>
                        </BoardContentsItem>
                        <BoardContentsItem>
                            {/* 1. 수정할것 User link를 Comments남긴 유저아이디의 nickName의 link를 걸어두도록 하기.*/}
                            <UserProfileLink className={"comments-profile"} to={`/${nickName}`}>
                                <UserProfile imgUrl={"https://scontent-icn1-1.cdninstagram.com/vp/30ddfbc60ab9924929498a8df578770a/5E5EFBA1/t51.2885-19/s150x150/49549840_371647546718802_4148861725589897216_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"} />
                            </UserProfileLink>
                            <Comments>
                                <CommentUser to={`/${nickName}`}>{nickName}</CommentUser>
                                해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!해발 2000미터에서 먹는 신라면 꿀맛!
                            </Comments>
                        </BoardContentsItem>
                    </BoardContents>
                    <BottomMenu />
                    <CommentInputText 
                        commentInput={commentInput}
                    />
                </BoardInfo>
                {
                    prevBoard && (
                        <LargeLeftBtn to={`/${nickName}/board/${prevBoard.id}`} onClick={e => { onPhotoItemStep(0); commentInput.onInit(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                        </LargeLeftBtn>    
                    )
                }
                {
                    nextBoard && (
                        <LargeRightBtn to={`/${nickName}/board/${nextBoard.id}`} onClick={e => { onPhotoItemStep(0); commentInput.onInit(); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                        </LargeRightBtn>
                    )
                }
            </Wrapper>
        </Container>
    )
};

export default ModalBoardDetails;