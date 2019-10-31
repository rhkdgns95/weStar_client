import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    width: 125px;
    height: 125px;
    overflow: hidden;
    transition: .2s;
    border-radius: 6px;
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0, .42);
        & > .img-box {
            border: .5px solid black;
        }
        & > .close-btn {
            transition: .3s;
            top: 5px;
            opacity: 1;
            pointer-events: auto;
            cursor: pointer;
        }
    }
`;
interface IPropsImgBox {
    bg: string;
}
const ImgBox = styled.div<IPropsImgBox>`
    width: 100%;
    height: 100%;
    background: url("${props => props.bg}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: .2s;
    border-radius: 6px;
    border: .5px solid black;
`;
const DeleteBtn = styled.div`
    position: absolute;
    top: -50px;
    pointer-events: none;
    right: 5px;
    background-color: black;
    border-radius: 50%;
    padding: 7px;
    display: flex;
    justify-content: center;
    opacity: 0;
    &:hover {
        transition: .3s;
        background-color: #f36e6e;
        & ~ .img-box {
            border: .5px solid #f36e6e;
        }
    }
    & > svg {
        fill: white;
    }
`;
interface IProps {
    imgSrc: string;
    className?: string;
    deletePreviewImgSrc: (index: number) => any;
    index: number;
}

const PreviewBoardPhoto: React.FC<IProps> = ({
    imgSrc,
    className,
    deletePreviewImgSrc,
    index
}) => {
    return (
        <Container className={className}>
            <DeleteBtn className={"close-btn"}  onClick={e => deletePreviewImgSrc(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </DeleteBtn>
            <ImgBox className={"img-box"} bg={imgSrc}/>
        </Container>
    )
};

export default PreviewBoardPhoto;