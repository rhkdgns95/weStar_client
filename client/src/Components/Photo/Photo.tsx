import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 100%;
    &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;
const PhotoImg = styled.img`
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
`;
const ImgSettings = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.34);
    opacity: 0;
    transition: opacity .3s;
    &:hover {
        opacity: 1;
    }
    @media(max-width: 500px) {
        display: none;
    }
`;
const SettingsWrapper = styled.div`
    display: flex;
    justify-content: inherit;
    align-items: inherit;
`;
const Icon = styled.div`
    & svg {
        fill: white;
    }
    margin: 0 8px;
    &:not(:nth-of-type(1)) {
        margin-left: 20px;
    }
`;
const Data = styled.span`
    color: white;
    padding-bottom: 7px;
    font-weight: bold;
    font-size: 18px;
`;

const NoPhoto = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    & svg {
        
    }
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
`;
const NoPhotoText = styled.span`
    margin-top: 10px;
    margin-left: 5px;
    padding-bottom: 10px;
    @media(max-width: 800px) {
        font-size: 10px;
    }
`;
const FilesIcon = styled.div`
    position: absolute;
    top: 10px;
    right 10px;
    display: none;
    &.active {
        display: block;
    }
    & svg {
        fill: white;
    }
    @media(max-width: 800px) {
        & svg {
            width: 17px;
            height: 17px;
        }
    }
`;
interface IProps {
    imgPath?: string;
    isMargin?: boolean;
    className?: string;
    isMany?: boolean;
}

const Photo: React.FC<IProps> = ({
    imgPath,
    isMargin,
    className,
    isMany
}) => {
    return (
        <Container className={className}>
            {
                imgPath ? (
                    <PhotoImg src={imgPath}/>
                ) : (
                    <NoPhoto>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"/></svg>
                        <NoPhotoText>No Photo</NoPhotoText>
                    </NoPhoto>
                )
            }
            <FilesIcon className={isMany ? "active" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm5.8-7v-2h-21v15h2v-13h19zm3 2v14h-20v-14h20zm-2 2h-16v10h16v-10z"/></svg>
            </FilesIcon>
            <ImgSettings>
                <SettingsWrapper>
                    <Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
                    </Icon>
                    <Data>3</Data>
                    <Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1c-6.627 0-12 4.364-12 9.749 0 3.131 1.817 5.917 4.64 7.7.868 2.167-1.083 4.008-3.142 4.503 2.271.195 6.311-.121 9.374-2.498 7.095.538 13.128-3.997 13.128-9.705 0-5.385-5.373-9.749-12-9.749z"/></svg>
                    </Icon>
                    <Data>3</Data>
                </SettingsWrapper>  
            </ImgSettings>  
        </Container>
    );
};

export default Photo;