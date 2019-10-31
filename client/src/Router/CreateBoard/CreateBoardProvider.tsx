import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from "react-apollo";
import { CREATE_BOARD } from "./CreateBoardQueries";
import { CreateBoardMutationVariables, CreateBoardMutationResponse } from "../../types/resolvers";

const useInput = (placeholder: string) => {
    const [value, setValue] = useState<string>(placeholder);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {target: { value }} = event;
        setValue(value);
    }
    return {
        value,
        onChange
    };
}
const useCreateBoardFetch = () => {
    const formInputText = useInput("");
    const [isUpload, setIsUpload] = useState<IUploadState>("NO-UPLOAD");
    const [allow, setAllow] = useState<IAllow>("ALL");
    const [previewImgSrc, setPreviewImgSrc] = useState<Array<string>>([]); // preivew 이미지 추출
    const [previewFiles, setPreviewFiles] = useState<Array<File>>([]); // preview 파일들.
    const [uploadedUrls, setUploadedUrls] = useState<Array<string>>([]); // Upload된 이미지 주소.
    const [progressList, setProgressList] = useState<Array<number>>([]); // 진행중인 Upload중인 progress
    const addPreviewFiles = useCallback((newPreviewImgSrc: string, newPreviewFile: File) => {
        setPreviewImgSrc(
            prevArray => [
            ...prevArray,
            newPreviewImgSrc
        ]);
        setPreviewFiles(
            prevArray => [
            ...prevArray,
            newPreviewFile
        ]);
        setProgressList(
            progressList => {
                progressList[progressList.length] = 0 // progressList.push(0); 와 같다.
                return progressList;
            }
        );
    }, [previewImgSrc, previewFiles]);
    
    const addUploadUrl = useCallback((newUploadedUrl: string) => {
        setUploadedUrls(prevArray => [
            ...prevArray,
            newUploadedUrl
        ]);
    }, [uploadedUrls]); 

    const deletePreviewImgSrc = useCallback((index: number) => {
        console.log("deletePreviewImgSrc() - index: ", index);
        setPreviewImgSrc(
            prevArray => [
                ...prevArray.filter((_, key) => key !== index)
            ]
        );
        setPreviewFiles(
            prevArray => [
                ...prevArray.filter((_, key) => key !== index)
            ]
        );
        setProgressList(
            progressList => {
                progressList.pop();
                return progressList
            }
        )
    }, [previewImgSrc]);
    
    const startProgressList = (idx: number, uploadData: number) => {
        console.log("startProgressList: ", idx, ": ", uploadData);
        setProgressList(prevArray => {
            prevArray[idx] = uploadData;
            return prevArray;
        });
    }
    const onUploadState = (uploadState: IUploadState) => { setIsUpload(uploadState); }
    const onUpdateAllow = (allow: IAllow) => { setAllow(allow); }

    return {
        formInputText,
        previewImgSrc,
        previewFiles,
        uploadedUrls,
        addPreviewFiles,
        progressList,
        deletePreviewImgSrc,
        addUploadUrl,
        startProgressList,
        isUpload,
        allow,
        onUploadState,
        onUpdateAllow
    };
}
const CreateBoardContext: React.Context<ICreateBoardContext> = React.createContext<ICreateBoardContext>({
    isUpload: "NO-UPLOAD",
    allow: "ALL",
    formInputText: {value: "", onChange: () => {}},
    previewImgSrc: [],
    previewFiles: [],
    uploadedUrls: [],
    progressList: [],
    startProgressList: () => {},
    addPreviewFiles: () => {},
    deletePreviewImgSrc: () => {},
    addUploadUrl: () => {},
    mutationUploadFiles: () => {},
    onUploadState: () => {},
    onUpdateAllow: () => {},
});

const useCreateBoardContext = () => React.useContext(CreateBoardContext);

const useFetchCreateBoard = (): {value: ICreateBoardContext} => {
    const [ mutationUploadFiles ] = useMutation<CreateBoardMutationResponse, CreateBoardMutationVariables>(CREATE_BOARD, {
        onCompleted: data => {
            console.log("mutationUploadFiles completed: ", data);
        }
    });
    const { formInputText, previewImgSrc, addPreviewFiles, deletePreviewImgSrc, previewFiles, addUploadUrl, uploadedUrls, progressList, startProgressList, isUpload, onUploadState, allow, onUpdateAllow } = useCreateBoardFetch(); 
    
    return {
        value: {
            formInputText,
            previewImgSrc,
            previewFiles,
            addPreviewFiles,
            deletePreviewImgSrc,
            mutationUploadFiles,
            addUploadUrl,
            uploadedUrls,
            progressList,
            startProgressList,
            isUpload,
            allow,
            onUploadState,
            onUpdateAllow
        }
    };
}

const CreateBoardProvider: React.FC<any> = ({children}) => {
    const data = useFetchCreateBoard();
    
    return (
        <CreateBoardContext.Provider {...data}>
            {
                children
            }
        </CreateBoardContext.Provider>
    );
};

export { useCreateBoardContext };
export default CreateBoardProvider;