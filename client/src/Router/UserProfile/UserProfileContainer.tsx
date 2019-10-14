import React, { useEffect } from 'react';
import UserProfilePresenter from './UserProfilePresenter';
import { RouteComponentProps } from 'react-router';
import PageNotFound from '../../Components/PageNotFound';
import { useProvideUserProfile, useProvideUserBoards } from './UserProfileProvider';
import { useAuth } from '../../Auth';

interface IProps extends RouteComponentProps<any> {
    
}

const ProfileContainer: React.FC<IProps> = ({
    match
}) => {
    const { params: { nickName }, path } = match;
    const pathType = path.split("/");
    const selector: string = pathType[2] || "board"; // 선택타입
    const { loadingUserProfile, dataUserProfile: { GetUserProfile: { ok: GetUserProfileOk=false, error: GetUserProfileError="", user={id:0, nickName:"", fullName:"", email:""} || null} = {}} = {}} = useProvideUserProfile(nickName);
    const { loadingGetUserBoards, dataGetUserBoards: { GetUserPublicBoards: { ok: GetUserPublicBoardsOk=false, error: GetUserPublicBoardsError="", boards=[]} = {}} ={}} = useProvideUserBoards(user ? user.id : undefined);
    const { user: loginUser } = useAuth();
    // console.log("boards: ", boards);
    // const { GetUserPublicBoards: { boards: [] = [] } = {}} = dataGetUserBoards;
    // console.log(boards);
    if(loadingUserProfile || loadingGetUserBoards) { // 로딩창
        return <div></div>
    }
    if(!GetUserProfileOk || !GetUserPublicBoardsOk) {
        const error = GetUserProfileError;
        const error2 = GetUserPublicBoardsError;
        return <PageNotFound error={`${error} ${error2}`}/>
    } else {
        // Tmp Image
        const profilePhoto: string = "http://img.hani.co.kr/imgdb/resize/2018/0313/00500561_20180313.JPG";
        const { fullName, email, id } = user;
        console.log("User_id: ", user.email);
        return (
            <UserProfilePresenter 
                isSelf={id === loginUser.id}
                profilePhoto={profilePhoto}
                nickName={nickName}
                fullName={fullName}
                selector={selector}
                boards={boards}
            />
        )
    }
};

export default ProfileContainer;