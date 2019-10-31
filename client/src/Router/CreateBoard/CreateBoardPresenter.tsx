import React from "react";
import styled from "../../Styles/typed-components";
import FormTextInput from "../../Components/FormTextInput";
import PreviewBoardPhoto from "../../Components/PreviewBoardPhoto";
import UploadButton from "../../Components/UploadButton";
import ModalCreateBoard from "../../Components/Modal/ModalCreateBoard";
import RadioButton from "../../Components/RadioButton";

const Container = styled.div`
    background-color: white;
`;
const Wrapper = styled.div`
    padding: 30px;
    max-width: 900px;
    margin: 0 auto;
`;
const InputExtended = styled(FormTextInput)`
    margin: 0;
`;
const DragBox = styled.div`
    position: relative;
    border: 3px dashed #dfdfdf;
    height: 300px;
    width: 100%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    &:hover,
    &.active {
        border: 3px dashed #03a9f4;
        & > span {
            color: black;
        }
    }
    cursor: pointer;
`;
const DragText = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: darkgray;
    transition: .2s;
    &.active {
        color: black;
    }
`;
const PreviewZone = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0;
    transition: .3s;
    transition-timing-function: ease-in-out;
    opacity: 0;
    height: 10px;
    &.active {
        padding: 10px 0;
        height: auto;
        opacity: 1;
        margin-left: 0;
    }
`;
const PreviewZoneWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;
const PreviewBoardPhotoExtended = styled(PreviewBoardPhoto)`
    margin-right: 10px;
`;
const UploadButtonExtended = styled(UploadButton)`

`;
const DataRate = styled.div`
    font-size: 13px;
    white-space: nowrap;
    color: #5a5c8e;
    margin-bottom: 10px;
`;
const GroupRadio = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    margin-top: 15px;
    & > div {
        margin-right: 5px;
    }
`;
interface IProps {
    error: string | null;
    formInputText: ICreateBoardInput;
    getRootProps: any;
    getInputProps: any;
    isDragActive: any;
    nickName: string;
    imgSrcArr: Array<string>;
    allow: IAllow;
    deletePreviewImgSrc: (index: number) => any;
    handleUpload: () => any;
    handleUpdateAllow: (event: React.ChangeEvent<HTMLInputElement>) => any;
    progressList?: Array<any>;
    isUpload: IUploadState;
    imgMaxSize: number;
    imgCurrentSize: number;
}
const CreateBoardPresenter: React.FC<IProps> = ({
    error,
    allow,
    formInputText,
    getRootProps,
    getInputProps,
    isDragActive,
    nickName,
    imgSrcArr,
    deletePreviewImgSrc,
    handleUpload,
    handleUpdateAllow,
    progressList,
    isUpload,
    imgMaxSize,
    imgCurrentSize
}) => {
    return (
        <Container>
            <Wrapper className={error !== null ? "error" : ""}>
                <InputExtended 
                    className={"title_input"}
                    name={"title"}
                    value={formInputText.value}
                    labelText={"TITLE"}
                    onChange={formInputText.onChange}
                    isNullEmail={formInputText.value === ""}
                />
                <GroupRadio>
                    <RadioButton groupName={"allow-board-radio"} onChange={handleUpdateAllow} label={"전체공개"} name={"ALL"} defaultChecked={true}/>
                    <RadioButton groupName={"allow-board-radio"} onChange={handleUpdateAllow} label={"내 팔로우만"} name={"ONLY_FOLLOWED"} defaultChecked={false}/>
                    <RadioButton groupName={"allow-board-radio"} onChange={handleUpdateAllow} label={"나만보기"} name={"ONLY_MINE"} defaultChecked={false}/>
                </GroupRadio>
                <PreviewZone className={imgSrcArr.length > 0 ? "active" : ""}>
                {
                    
                    imgSrcArr.length > 0 && (
                        <PreviewZoneWrapper>
                        {
                            imgSrcArr.map((img, key) => <PreviewBoardPhotoExtended imgSrc={img} key={key} deletePreviewImgSrc={deletePreviewImgSrc} index={key}/>)
                        }
                        </PreviewZoneWrapper>
                    ) 
                }
                </PreviewZone>
                {
                    imgSrcArr.length > 0 && (
                        <DataRate>
                            { (imgCurrentSize / 1024).toFixed(3) }KB / { imgMaxSize / 1024 }KB
                        </DataRate>
                    )
                }
                <DragBox {...getRootProps()} className={isDragActive ? "active" : ""}>
                    <input {...getInputProps()} accept={"image/*"}/>
                    {
                        isDragActive ? 
                        <DragText className={isDragActive ? "active" : ""}>Drop the file</DragText> : 
                        <DragText>Darg 'n' some file here</DragText>
                    }
                </DragBox>
                <UploadButtonExtended value={"UPLOAD"} handleUpload={handleUpload} disabled={isUpload === "NO-UPLOAD" ? false : true}/>
            </Wrapper>
            <ModalCreateBoard nickName={nickName} isUpload={isUpload} progressList={progressList} imgSrcArr={imgSrcArr}/>
        </Container>
    );
}

export default CreateBoardPresenter;