import { useQuery } from "react-apollo-hooks";
import { GET_USER_PROFILE, GET_USER_BOARDS } from "./UserProfileQueries";
import { GetUserProfileResponse, GetUserProfileQueryVariables, GetUserPublicBoardsQueryVariables } from "../../types/resolvers";

const useProvideUserProfile = (nickName: string) => {
    console.log("UserProvideUserProfile");
    const { data: dataUserProfile, loading: loadingUserProfile } = useQuery<GetUserProfileResponse, GetUserProfileQueryVariables>(GET_USER_PROFILE, {
        variables: {
            nickName
        }
    });
    
    return {
        dataUserProfile,
        loadingUserProfile
    }
};

const useProvideUserBoards = (userId?: number) => {
    const skip: boolean = userId ? false : true;
    const { data: dataGetUserBoards, loading: loadingGetUserBoards } = useQuery<any, GetUserPublicBoardsQueryVariables>(GET_USER_BOARDS, {
        variables: {
            userId: userId || 0
        },
        skip
    });
    const TmpFunc = () => {
        console.log("Hello");
    }
    return {
        dataGetUserBoards, 
        loadingGetUserBoards
    };
}

export { useProvideUserProfile, useProvideUserBoards };