import React from "react";
import ProfilePresenter from "./ProfilePresenter";

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
const ProfileContainer: React.FC<IProps> = ({
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
    <ProfilePresenter
        clickedEditMyProfile={clickedEditMyProfile}
        profilePhoto={profilePhoto}
        nickName={nickName}
        name={name}
        isSelf={isSelf}
        followerCnt={followerCnt}
        followingCnt={followingCnt}
        boardCnt={boardCnt}
        onClickEditMyProfile={onClickEditMyProfile}
    />
);

export default ProfileContainer;