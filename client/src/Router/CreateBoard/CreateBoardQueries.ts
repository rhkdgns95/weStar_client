import { gql } from "apollo-boost";

export const CREATE_BOARD = gql`
    mutation createBoard(
        $text: String 
        $allow: CreateBoard!
        $images: [String!]!
        ) {
        CreateBoard(
            text: $text
            allow: $allow
            images: $images
        ) {
            ok
            error
            boardId
        }
    }
`;