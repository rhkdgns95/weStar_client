// Type _____
type User = {
    id: number;
    email: string;
    fullName: string;
    nickName: string;
}

// Local______
export type UserLoggedInMutationVariables = {
    token: string;
}



// Query_______

// GetUsers_Start
type GetUsers = {
    ok: boolean;
    error: string | null;
    users: User[] | null
};

export type GetUsersResponse = {
    GetUsers: GetUsers;
};

export type GetUsersQueryVariables = {
    name: string;
};

// GetUsers_End

// GetUserProfile_Start
type GetUserProfile = {
    ok: boolean;
    error: string | null;
    user: User | undefined;
}
export type GetUserProfileResponse = {
    GetUserProfile: GetUserProfile;
};
export type GetUserProfileQueryVariables = {
    nickName: string;
};
// GetUserProfile_End

// GetUserPublicBoards_Start

export type GetUserPublicBoardsQueryVariables = {
    userId: number;
}
// GetUserPublicBoards_End

// Mutation__________

// EmailSignIn_Start
type EmailSignIn = {
    ok: boolean!;
    error?: string;
    token?: string;
};
export type EmailSignInResponse = {
    EmailSignIn: EmailSignIn
};
export type EmailSignInMutationVariables = {
    email: string;
    password: string;
};
// EmailSignIn_End

// GetMyProfile_Start
type GetMyProfile = {
    ok: boolean;
    error?: string;
    user?: User;
}
export type GetMyProfileResponse = {
    GetMyProfile: GetMyProfile
}
// GetMyProfile_End