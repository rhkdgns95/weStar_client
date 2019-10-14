import React from "react";
import ProfilePresenter from "./ProfilePresenter";

interface IProps {
    profilePhoto: string;
    nickName: string;
    name: string;
    isSelf: boolean;
}
const ProfileContainer: React.FC<IProps> = ({
    profilePhoto,
    nickName,
    name,
    isSelf
}) => (
    <ProfilePresenter
        profilePhoto={profilePhoto}
        nickName={nickName}
        name={name}
        isSelf={isSelf}
    />
);

export default ProfileContainer;