import { gql } from "apollo-boost";

export const GET_MY_PROFILE = gql`
    query getMyProfile {
        GetMyProfile {
            ok
            error
            user {
                id
                fullName
                email
                nickName
            }
        }
    }
`;