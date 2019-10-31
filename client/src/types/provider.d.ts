// 0. AppProvider
// 1. SignUpProvider
// 2. CreateBoardProvider
// 3. UserProfileProvider

// [0] Start
interface IAppContext {
    appState: IAppState,
    exeLoading: boolean;
    onError: (errorMessage: string) => void;
    onLoading: () => void;
    onExeLoading: () => void;
    onUpdateTitle: (title: string) => void;
}
interface IAppState {
    loading: boolean;
    error: string | null;
}
interface IAppStateReducerAction {
    type: "OK" | "ERROR" | "RESET";
    error: string | null;
}
// [0] End

// [1] Start
interface ISignUpContext {
    mutationEmailSignUp: any;
    signUpFormState: ISignUpFormState;
}
interface IFormProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ISignUpFormState {
    email: IFormProps,
    password: IFormProps,
    firstName: IFormProps,
    lastName: IFormProps,
    phoneNumber: IFormProps,
    nickName: IFormProps
};

// [1] End

// [2] Start
type IUploadState = "NO-UPLOAD" | "UPLOADING" | "UPLOADED";
type IAllow = "ALL" | "ONLY_FOLLOWED" | "ONLY_MINE";

interface ICreateBoardInput {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
};
interface ICreateBoardMutationVariables {
    variables: {
        text: string | null,
        allow: "ALL" | "ONLY_FOLLOWED" | "ONLY_MINE",
        images: Array<string>
    }
};
interface ICreateBoardMutationResponse {
    CreateBoard: {
        ok: boolean;
        error: string | null;
        boardId: number | null;
    }
};

interface ICreateBoardContext {
    formInputText: ICreateBoardInput;
    previewImgSrc: Array<string>;
    previewFiles: Array<File>;
    uploadedUrls: Array<string>;
    progressList: Array<number>;
    addPreviewFiles: (newPreviewImgSrc: string, newPreviewFile: File) => any;
    deletePreviewImgSrc: (index: number) => any;
    mutationUploadFiles: (data) => any;
    addUploadUrl: (newUploadUrl) => any;
    startProgressList: (idx: number, uploadData: number) => any;
    isUpload: IUploadState;
    allow: IAllow;
    onUploadState: (data: IUploadState) => any;
    onUpdateAllow: (data: IAllow) => any;
}
// [2] End

// [3] Start
interface IUseInputResponse {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
    onInit: () => any;
}
interface IUserProfileProvider {
    data: any;
    loading: boolean;
    clickedEditMyProfile: boolean;
    clickedBoardDetails: number | null;
    onClickEditMyProfile: (data: boolean) => any;
    onClickBoard: (boardId: number | null) => any;
    boardDetailsData: any;
    boardDetailsLoading: boolean;
    commentInput: IUseInputResponse;
}
// [3] End