import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_USER_PROFILE, GET_BOARD_DETAILS } from "./UserProfileQueries";
import { GetUserProfileResponse, GetUserProfileQueryVariables, GetUserPublicBoardsQueryVariables, GetBoardDetailsQueryVariables, GetBoardDetailsResponse } from "../../types/resolvers";

const InitProvider: IUserProfileProvider = {
    data: {},
    loading: true,
    commentInput: { value: "", onChange: () => {}, onInit: () =>{} },
    clickedEditMyProfile: false,
    clickedBoardDetails: null,
    onClickEditMyProfile: () => {},
    onClickBoard: () => {},
    boardDetailsData: {},
    boardDetailsLoading: true
};
const useInput = () => {
    const [ value, setValue ] = useState("");
    
    const onInit = () => {
        setValue("");
    }
    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    }   

    return {
        value,
        onChange,
        onInit
    };
};
const UserProfileContext: React.Context<IUserProfileProvider> = React.createContext<IUserProfileProvider>(InitProvider);
const useUserProfileContext = () => React.useContext(UserProfileContext);

const useFetch = (nickName: string, boardId: number | null) => {
    const [ clickedEditMyProfile, setClickedEditMyProfile ] = useState<boolean>(false);
    const [ clickedBoardDetails, setClickedBoardDetails ] = useState<number | null>(boardId);
    const commentInput = useInput();

    const { data, loading } = useQuery<GetUserProfileResponse, GetUserProfileQueryVariables>(GET_USER_PROFILE, {
        variables: {
            nickName
        }
    });
    const { data: boardDetailsData, loading: boardDetailsLoading } = useQuery<GetBoardDetailsResponse, GetBoardDetailsQueryVariables>(GET_BOARD_DETAILS, {
        variables: {
            boardId: boardId || -1 
        },
        skip: boardId ? false : true  // boardId가 없다면, 생략.
    });
    
    if(boardId) {
        window.document!.querySelector('html')!.style.overflow = "hidden";
    }

    const onClickBoard = (boardId: number | null) => {
        if(boardId) {
            document!.querySelector("html")!.style.overflow = "hidden";
        } else {
            document!.querySelector("html")!.style.overflow = "auto";
        }
        setClickedBoardDetails(boardId);
    }
    
    const onClickEditMyProfile = (data: boolean) => {
        console.log("onClickEditMyProfile: ", data);
        setClickedEditMyProfile(data);
    }
    
    return {
        value: {
            data,
            loading,
            clickedEditMyProfile,
            onClickEditMyProfile,
            clickedBoardDetails,
            onClickBoard,
            boardDetailsData,
            boardDetailsLoading,
            commentInput
        }
    }
}
interface IProviderProps {
    children: any;
    nickName: string;
    boardId: number | null;
}
const UserProfileProvider: React.FC<IProviderProps> = ({
    children,
    nickName,
    boardId
}) => {
    const data = useFetch(nickName, boardId);
    return (
        <UserProfileContext.Provider {...data}>
            {
                children
            }
        </UserProfileContext.Provider>
    )
}

// export { useProvideUserProfile, useProvideUserBoards };
export { useUserProfileContext };
export default UserProfileProvider;