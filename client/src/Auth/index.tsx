import React, { useState, useContext } from "react";
import { useQuery } from "react-apollo";
import { GET_MY_PROFILE } from "./authQueries";
import { GetMyProfileResponse, User } from "../types/resolvers";

export const AuthContext: React.Context<any> = React.createContext<any>({});

interface IUseAuthResponse {
    user: any;
    loadingUserProfile: any;
} 
const useAuth = (): IUseAuthResponse => useContext(AuthContext);

const useProvideAuth = () => {
    const [ user, setUser ] = useState<User | any>({});
    const { data: getMyProfileData, loading: loadingUserProfile} = useQuery<GetMyProfileResponse>(GET_MY_PROFILE, {
        onCompleted: data => {
            const { GetMyProfile } = data;
            if(GetMyProfile.ok) {
                const { user } = GetMyProfile;
                if(user) {
                    setUser({
                        ...user
                    });
                }
            }
        },
        onError:data => {
            // 로그아웃 시키도록해야한다.
            // 토큰값 일치하지 않는경우.
            console.log(`error: `, data);
        }
    });
    
    return {
        loadingUserProfile,
        user
    };
};

const ProvideAuth: React.FC<any> = ({children}) => {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {
                children
            }
        </AuthContext.Provider>
    )
} 

export { useAuth, ProvideAuth };