import ApolloClient, { Operation } from "apollo-boost"

const getLoggedIn = () => localStorage.getItem("jwt") || "";

export const client = new ApolloClient({
    clientState: {
        defaults: {
            auth: {
                __typename: "Auth",
                isLoggedIn: Boolean(localStorage.getItem("jwt") || "")
            }
        },
        resolvers: {
            Mutation: {
                LoggedIn: (_, { token }, { cache }) => {
                    localStorage.setItem("jwt", token);
                    cache.writeData({
                        data: {
                            auth: { 
                                __typename: "Auth",
                                isLoggedIn: true
                            }
                        }
                    });
                    return null;
                },
                LoggedOut: (_, __, { cache }) => {
                    localStorage.removeItem("jwt");
                    cache.writeData({
                        data: {
                            auth: {
                                __typename: "Auth",
                                isLoggedIn: false
                            }
                        }
                    });
                    return null;
                }
            }
        }
    },
    request: (operation: Operation) => {
        operation.setContext({
            headers: {
                "X-JWT": localStorage.getItem("jwt") || ""
            }
        })
    },
    uri: "http://localhost:4000/myGraphql"
});