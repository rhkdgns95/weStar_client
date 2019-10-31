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
                followers {
                    id
                }
                following {
                    id
                }
            }
            boards {
                id
                text
                favoriteMembers {
                    id
                }
                comments {
                    id
                    text
                }
                files {
                    url
                }
            }
        }
    }
`;
export const GET_BOARD_DETAILS = gql`
    query getBoardDetails($boardId: Int!) {
        GetBoardDetails(boardId: $boardId) {
            ok
            error
            board {
                id
                text
                files {
                    url
                }
                comments {
                    id
                    text
                }
            }
        }
    }
`;