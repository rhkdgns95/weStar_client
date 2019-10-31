import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`    
    display: flex;
`;
// const Wrapper = styled.div`
//     display: flex;
//     border-bottom: 1px solid #dfdfdf;
//     padding: 50px 0;
//     width: calc(100% - 40px);
//     box-sizing: border-box;
//     margin: 0 auto;
//     max-width: 930px;
//     @media(max-width: 800px) {
//         padding: 35px 0;
//     }
// `;
const ProfilePhoto = styled.div`
    padding: 0 90px;    
    box-sizing: border-box;
    @media(max-width: 800px) {
        padding: 0;
        padding-left: 15px;
    }
`;
const ProfilePhotoWrapper = styled.div`
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    transition: .1s;
    @media(max-width: 800px) {
        width: 90px;
        height: 90px;
        margin-right: 30px;
    }
`;
const Photo = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
const ProfileInfo = styled.div`
`;
const InfoTop = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & > h3 {
        margin-right: 20px;
    }
    @media(max-width: 800px) {
        flex-flow: column wrap;
        align-items: flex-start;
        justify-content: flex-start;
        height: 90px;
    }
`
const Email = styled.h3`
    font-size: 27px;
    font-weight: 200;
    max-width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
    @media(max-width: 800px) {
        margin: 0;
        margin-bottom: 20px;
    }
`;
const ButtonGroup = styled.div`
    display: inherit;
    align-items: center;
    &.active {
        @media(max-width: 800px) {
            width: 70%;
            & > button {
                width: 100%;
            }
        }
    }
`;
const Button = styled.button`
    background-color: ${props => props.theme.blueColor};
    color: white;
    height: 30px;
    border: 0;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 550;
    cursor: pointer;
    &:active {
        opacity: .7;
    }
    white-space: nowrap;
    margin-right: 10px;
`;
const FollowButton = styled(Button)`
    padding: 0 25px;
`;
const RecommandButton = styled(Button)`
    padding: 0 15px;
    & svg {
        fill: white;
        transform: rotateX(180deg);
    }
`;
const SetButton = styled.button`
    display: flex;
    align-items: center;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    margin-right: 10px;
    &:focus{
        box-shadow: none;
        outline: none;
    }
    & > svg {
        fill: #868686;
        // padding: 0 10px;
    }
    @media(max-width: 800px) {
        margin-top: 10px;
    }
`;
const InfoMiddle = styled.div`

`;
const DataName = styled.span`
    margin-right: 4px;
`;
const Data = styled.span`
    margin-right: 50px;
    font-weight: 700;
`
const UserName = styled.h5`
    // margin-top: 37px;
`;
const EditButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    padding: 5px 10px;
    font-weight: bold;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    box-sizing: border-box;
    &:active {
        opacity: .3;
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
    
`;

interface IProps {
    clickedEditMyProfile: boolean;
    profilePhoto: string;
    nickName: string;
    name: string;
    isSelf: boolean;
    followerCnt: number;
    followingCnt: number;
    boardCnt: number;
    onClickEditMyProfile: (data: boolean) => any;
}
const ProfilePresenter: React.FC<IProps> = ({
    clickedEditMyProfile,
    profilePhoto,
    nickName,
    name,
    isSelf,
    followerCnt,
    followingCnt,
    boardCnt,
    onClickEditMyProfile
}) => (
    <Container>
        <ProfilePhoto>
            <ProfilePhotoWrapper>
                <Photo src={ profilePhoto }/>
            </ProfilePhotoWrapper>
        </ProfilePhoto>
        <ProfileInfo>
            <InfoTop>
                <Email>{ nickName }</Email>
                <ButtonGroup className={isSelf ? "active" : ""}>
                    {
                        isSelf ? 
                        ( 
                            <React.Fragment>
                                <EditButton>프로필 편집</EditButton>
                            </React.Fragment>
                        ) :
                        (
                            <React.Fragment>
                                <FollowButton>팔로우</FollowButton>
                                <RecommandButton>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg>
                                </RecommandButton>
                            </React.Fragment>
                        )
                    }
                </ButtonGroup>
                <SetButton onClick={isSelf ? e => { onClickEditMyProfile(!clickedEditMyProfile); } : e => {}}>
                    {
                        isSelf ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm5 3c0-2.761-2.238-5-5-5h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14zm-13 12h-2v3h-2v-3h-2v-3h6v3zm-2-13h-2v8h2v-8zm10 5h-6v3h2v8h2v-8h2v-3zm-2-5h-2v3h2v-3z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/></svg>
                        )
                    }
                </SetButton>
            </InfoTop>
            <InfoMiddle>
                <DataName>게시물</DataName>
                <Data>{boardCnt}</Data>
                <DataName>팔로워</DataName>
                <Data>{followerCnt}</Data>
                <DataName>팔로잉</DataName>
                <Data>{followingCnt}</Data>
            </InfoMiddle>
            <UserName>{ name }</UserName>
        </ProfileInfo>
    </Container>
);

export default ProfilePresenter;