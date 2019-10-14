import { gql } from "apollo-boost";

export const EMAIL_SIGN_IN = gql`
    mutation emailSignIn($email: String! $password: String!){
        EmailSignIn(email: $email password: $password) {
            ok
            error
            token
        }
    }
`;

export const USER_LOGGED_IN = gql`
    mutation loggedIn(
        $token: String!
    ) {
        LoggedIn (
            token: $token 
        ) @client
    }
`;