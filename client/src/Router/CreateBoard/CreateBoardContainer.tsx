import React, { useEffect, useCallback } from "react";
import CreateBoardProvider, { useCreateBoardContext } from "./CreateBoardProvider";
import CreateBoardPresenter from "./CreateBoardPresenter";
import { useAppContext } from "../App/AppProvider";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Auth";

/**
 *  Cloundinary - Direct call to the API
 * 
 *  API_KEY       : Unique API key of User Cloudinary account.
 *  CLOUD_NAME    : name of User Cloudinary account.
 *  RESOURCE_TYPE : upload file type [image, raw, video and auto]
 */
const API_KEY: string = "347663746347357";
const CLOUD_NAME: string= "dljwleqvc";
const RESOURCE_TYPE: string = "image";

const URL: string = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${RESOURCE_TYPE}/upload`;

const ACCEPTED_EXE_TYPE = ["image/png", "image/jpeg", "image/jpg"];

/**
 *  게시판 이미지 최대 크기: 750KB
 *  MAX_SIZE: 500KB
 *  
 *  1KB => 1024Byte
 *  1024Byte * 750 => 768,000byte
 *  768,000byte => 750KB
 */
const MAX_IMG_SIZE: number = 750 * 1024;

const useDropFetch = (onError, currentImgSize, callbackFnAddPreview, mutationUploadFiles ) => {
    console.log("useDropFetch currentImgSize: ", currentImgSize);
    const onDrop = useCallback((acceptedFiles: File[], rejectedFile) => {
        // upload(new FormData(), acceptedFiles[0]);
        console.log("File : ", acceptedFiles);
        console.log("onDrop()");
        let FilesSize = currentImgSize;
        acceptedFiles.forEach(async (acceptedFile) => {
            console.log("CurrentSize: ", FilesSize);
            const correctType = ACCEPTED_EXE_TYPE.find(type => type === acceptedFile.type);
            /**
             *  파일 업로드 조건
             * 
             *  1. 파일 포멧: 이미지파일 (ACCEPTED_EXE_TYPE 배열에 정의)
             *  2. 파일 크기: 업로드할 파일들이 Total 750KB를 넘기면 안됨.
             */
            if(!correctType) {
                const errorMessage = "Warning! The file format should be 'png', 'jpeg' or 'jpg'.";
                onError(errorMessage);
                return;
            }
            if(FilesSize + (acceptedFile.size) > MAX_IMG_SIZE) {
                const errorMessage = "Warning! The total size of images exceeded 750KB.";
                onError(errorMessage);
                return;
            }
            FilesSize += acceptedFile.size;
            const reader = new FileReader();

            /**
             *  업로드한 이미지 파일의 URL을 추출한다.
             */
            reader.onload = event => {
                const result = event!.target!.result;
                console.log("ONLOAD: ",event!.target!);
                callbackFnAddPreview(result + "", acceptedFile);
            }
           reader.readAsDataURL(acceptedFile);
        }); 

    /**
     *  주의!
     * 
     *  currentImgSize가 바뀔때마다 실행되어야하므로 
     *  useCallback({}, []) []안에 변수
     *  currentImgSize를 넣어야한다.
     */
    }, [ currentImgSize ]); 
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
    
    return {
        getRootProps,
        getInputProps,
        isDragActive
    };
}

const CreateBoardContainer = () => {
    const { onUpdateTitle, onError, appState: { error }} = useAppContext();
    const { user: { nickName }} = useAuth();
    const { formInputText, addPreviewFiles, previewImgSrc, previewFiles, deletePreviewImgSrc, mutationUploadFiles, uploadedUrls, addUploadUrl, isUpload, onUploadState, progressList, startProgressList, allow, onUpdateAllow } = useCreateBoardContext();
    let currentImgSize = 0;
    previewFiles.map(file => {currentImgSize += file.size});

    console.log("currentImgSize: ", currentImgSize);
    const { getRootProps, getInputProps, isDragActive } = useDropFetch(onError, currentImgSize, addPreviewFiles, mutationUploadFiles);
    /**
     *  Cloundinary저장소에 업로드 요청
     * 
     *  @param file
     *  : 업로드할 파일의 타입을 갖는 변수로, FormData에 추가시킨다.
     * 
     *  추가되어야 할 것.
     *  Cloudinary에 요청시 에러나는 경우도 
     *  처리해주어야한다.
     */
    const upload = async (file: File, key: number): Promise<void> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", API_KEY);
        formData.append("upload_preset", "hreon3pm");
        formData.append("timestamp", String(Date.now() / 1000));

        console.log("**** 전송시작 ****");
        console.log(`전체파일: ${previewFiles.length} / 현재파일: ${key}`);
        const request = await axios.post(URL, formData, {
            onUploadProgress: (data: ProgressEvent) => {
                const { loaded, total } = data;
                const percentCompleted = Math.round( (loaded * 100) / total );
                console.log("KEY --- ", key);
                setTimeout(() => {
                    startProgressList(key, percentCompleted);
                }, 100);
                console.log("percentCompleted --- ", percentCompleted);
            }
        });
        if(request) {
            const { status, statusText } = request;
            if(status === 200 && statusText === "OK") { // 전송성공.
                const { secure_url } = request.data;
                if(secure_url) {
                    console.log("**** 전송완료 ****");
                    console.log("REQUEST: ", request);
                    addUploadUrl(secure_url);
                    return secure_url;
                }
            } else {
                toast.error(`Error: ${file.name}`);     // 전송실패.
            }
        } else {
            console.log("ERROR");
        }
    }

    useEffect(() => { onUpdateTitle("Westar | 글 작성하기");}, []);
    
    console.log("previewFiles - ", previewFiles);
    console.log("previewImgSrc - ", previewImgSrc);
    console.log("uploadedUrls - ", uploadedUrls);

    /**
     *  handleUpload: () => {}
     * 
     *  버튼 [Upload ]을 클릭했을때,
     *  Graphql 서버측에 Mutation요청을 보낸다.
     *  실행의 조건부로는 다음과 같다.
     *  1. uploadUrls.length > 0;
     *  2. text: string | null;
     *  3. isUpload: "NO-UPLOAD";
     */
    const handleUpload = async () => {
        console.log("Start");
        const isTrue: boolean = previewFiles.length > 0 && isUpload === "NO-UPLOAD";
        if(!isTrue) {
            onError("Warning: No Photo images...");
            return;
        }
        /**
         *  isUpdate 상태를 true로 변경
         *  upload button은 [disabled: true]으로 변경됨.
         */
        onUploadState("UPLOADING"); 

        /**
         *  Promise 처리하는 방법 - Array.map
         * 
         *  - Promise.all은 배열내의 모든 Promise가 통과될때까지
         *  기다리는 Promise를 반환한다. 
         *  - Promise.race는 도중에 하나라도 실패하면,
         *  즉시 리턴되는 Promise를 반환한다.
         * 
         *  여기서는 Promise.all을 사용해서
         *  처음부터 다 실행하도록 하면 된다. 
         * 
         *  [참고 - https://velog.io/@minsangk/2019-09-06-0209-%EC%9E%91%EC%84%B1%EB%90%A8-eik06xy8mm]
         */
        console.log("============== promise 시작 ===================")
        
        const urlArray: Array<any> = await Promise.all(
            previewFiles.map(async (previewFile, key) => {
                return await upload(previewFile, key);
            })
        );
        console.log("END");
        onUploadState("UPLOADED");
        console.log("완료됨");
        console.log("progreslist: ", progressList);
        /**
         *  notNullUrls: Array<string>
         * 
         *  Cloudinary에 저장되는 URL이
         *  올바른지 검토하는 작업이다.
         *  "" 이면, upload에서 제대로된 값을 return하지 못하였기
         *  때문이므로, DB상 올바르게 저장시키기 위해 공백이면 제외시킨다.
         */
        const notNullUrls: Array<string> = urlArray.filter((url: string) => url !== "");

        /**
         *  mutationUploadFiles()
         *  
         *  서버에 Cloudinary의 저장소에 
         *  저장된 URL들을 전송한다.
         */
        mutationUploadFiles({
            variables: {
                text: formInputText.value,
                allow,
                images: notNullUrls
            }
        });
        console.log("Current Upload Url List: ", notNullUrls);
        console.log("urlArray: ", urlArray);
        console.log("============== promise 종료 ===================")
    }
    const handleUpdateAllow: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {target: { id }} = event;
        onUpdateAllow(id as any);
    }
    return (
        <CreateBoardPresenter 
            error={error}
            allow={allow}
            formInputText={formInputText}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            imgSrcArr={previewImgSrc}
            deletePreviewImgSrc={deletePreviewImgSrc}
            handleUpload={handleUpload}
            handleUpdateAllow={handleUpdateAllow}
            progressList={progressList}
            isUpload={isUpload}
            nickName={nickName}
            imgMaxSize={MAX_IMG_SIZE}
            imgCurrentSize={currentImgSize}
        />
    );
};

const CreateBoard = () => (
    <CreateBoardProvider>
        <CreateBoardContainer />
    </CreateBoardProvider>
)
export default CreateBoard;