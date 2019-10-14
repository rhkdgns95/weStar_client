import { gql } from "apollo-boost";

export const GET_USER_PROFILE = gql`
    query getUserProfile($nickName: String!) {
        GetUserProfile(nickName: $nickName) {
            ok
            error
            user {
                fullName
                email
                id
                nickName
            }
        }
    }
`;
export const GET_USER_BOARDS = gql`
    query getUserPublicBoards($userId: Int!) {
        GetUserPublicBoards(userId: $userId) {
            ok
            error
            boards {
                board {
                    id
                    text
                    allow
                    files {
                        url
                    }
                    writer {
                        fullName
                    }
                }
            }
        }
    }
`;
