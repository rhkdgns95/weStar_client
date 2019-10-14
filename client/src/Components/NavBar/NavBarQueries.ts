import { gql } from "apollo-boost";

export const GET_SEARCH_USERS = gql`
    query getUsers($name: String!) {
        GetUsers(name: $name) {
            ok
            error
            users {
                id
                fullName
                nickName
            }
        }
    }
`;