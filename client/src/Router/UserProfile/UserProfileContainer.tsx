import React, { useEffect } from 'react';
import UserProfilePresenter from './UserProfilePresenter';
import { RouteComponentProps } from 'react-router';
import PageNotFound from '../../Components/PageNotFound';
// import { useProvideUserProfile, useProvideUserBoards } from './UserProfileProvider';
import { useAuth } from '../../Auth';
import UserProfileProvider, { useUserProfileContext } from './UserProfileProvider';
import { useAppContext } from '../App/AppProvider';
import Spinner from '../../Components/Spinner';

interface IProps extends RouteComponentProps<any> {
    
}
interface IUserProfileContainerProps {
    selector: string;
    nickName: string;
}
const UserProfileContainer: React.FC<IUserProfileContainerProps> = ({
    selector,
    nickName
}) => {
    const { data, loading, clickedEditMyProfile, onClickEditMyProfile, onClickBoard, clickedBoardDetails, boardDetailsData, boardDetailsLoading } = useUserProfileContext();
    console.log("DATA: ", data);
    console.log("boardDetailsData: ", boardDetailsData);
    const { user: loginUser } = useAuth();

    const profilePhoto: string = "http://img.hani.co.kr/imgdb/resize/2018/0313/00500561_20180313.JPG";
    console.log("LOADING: ", loading);
    if(loading || !data || !data.GetUserProfile) {
        return <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><Spinner /></div>
    } else {
        const { GetUserProfile: { ok, error, user, boards }} = data;
        console.log("BOARDS: ", data);
        if(!ok || !user) {
            return <PageNotFound error={`${error}`}/>
        } else {
            const { nickName, fullName, followers, following } = user;    
            return (
                <UserProfilePresenter 
                isSelf={loginUser.id === user.id}
                profilePhoto={profilePhoto}
                nickName={nickName}
                fullName={fullName}
                selector={selector}
                followerCnt={followers!.length}
                followingCnt={following!.length}
                boards={boards}
                clickedEditMyProfile={clickedEditMyProfile}
                clickedBoardDetails={clickedBoardDetails}
                onClickEditMyProfile={onClickEditMyProfile}
                onClickBoard={onClickBoard}
                boardDetailsData={boardDetailsData}
                boardDetailsLoading={boardDetailsLoading}
            />
            )
        }
    }
};
const UserProfile: React.FC<IProps> = ({
    match,
}) => {
    console.log("match: ", match);
    const { params: { nickName, boardId }, path } = match;
    const pathType = path.split("/");
    const selector: string = pathType[2] || "board"; // 선택타입
    return (
        <UserProfileProvider 
            nickName={nickName}
            boardId={boardId ? parseInt(boardId) : null}
        >
            <UserProfileContainer 
                nickName={nickName}
                selector={selector}/>
        </UserProfileProvider>
    )
}
export default UserProfile;