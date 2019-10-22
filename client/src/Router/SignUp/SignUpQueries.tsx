import { gql } from "apollo-boost";

export const EMAIL_SIGNUP = gql`
    mutation emailSignUp(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $phoneNumber: String!
        $nickName: String!
    ) {
        EmailSignUp(
            email: $email
            password: $password
            firstName: $firstName
            lastName: $lastName
            phoneNumber: $phoneNumber
            nickName: $nickName
        ) {
            ok
            error
            token
        }
    }
`;