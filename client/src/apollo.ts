import { ApolloClient, ApolloClientOptions } from "apollo-client";
import { HttpLink, ApolloLink, Operation, concat, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";

const httpLink = new HttpLink({uri: "http://localhost:4000/myGraphql"});
const uploadLink = createUploadLink({uri: "http://localhost:4000/myGraphql"});

const cache = new InMemoryCache();

cache.writeData({
    data: {
        auth: {
            __typename: "Auth",
            isLoggedIn: localStorage.getItem("jwt")
        }
    }
});

const authMiddleware = new ApolloLink((operation: Operation, forward) => {
    operation.setContext({
        headers: {
            "X-JWT": localStorage.getItem("jwt")
        }
    });
    return forward(operation);
});

export const client = new ApolloClient({
    // link: concat(authMiddleware, httpLink)
    link: ApolloLink.from([authMiddleware, httpLink, uploadLink]),
    cache,
    resolvers: {
        Mutation: {
            LoggedIn: (_, { token }, { cache }: {cache: InMemoryCache}) => {
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
            LoggedOut: (_, __, { cache }: {cache: InMemoryCache}) => {
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

});

// import ApolloClient, { Operation } from "apollo-boost"

// const getLoggedIn = () => localStorage.getItem("jwt") || "";

// export const client = new ApolloClient({
//     clientState: {
//         defaults: {
//             auth: {
//                 __typename: "Auth",
//                 isLoggedIn: Boolean(localStorage.getItem("jwt") || "")
//             }
//         },
//         resolvers: {
//             Mutation: {
//                 LoggedIn: (_, { token }, { cache }) => {
//                     localStorage.setItem("jwt", token);
//                     cache.writeData({
//                         data: {
//                             auth: { 
//                                 __typename: "Auth",
//                                 isLoggedIn: true
//                             }
//                         }
//                     });
//                     return null;
//                 },
//                 LoggedOut: (_, __, { cache }) => {
//                     localStorage.removeItem("jwt");
//                     cache.writeData({
//                         data: {
//                             auth: {
//                                 __typename: "Auth",
//                                 isLoggedIn: false
//                             }
//                         }
//                     });
//                     return null;
//                 }
//             }
//         }
//     },
//     request: (operation: Operation) => {
//         operation.setContext({
//             headers: {
//                 "X-JWT": localStorage.getItem("jwt") || ""
//             }
//         })
//     },
//     uri: "http://localhost:4000/myGraphql"
// });