import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 10px;
    flex-flow: wrap;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
`;
const LeftWrapper = styled.div`
    display: flex;
    width: 50%;
`;
const RightWrapper = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
`;
const Icon  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 30px;
    cursor: pointer;
    & svg {
        
    }
`;
const Favorites = styled.span`
    display: block;
    padding: 5px 12px;
    font-weight: bold;
    width: 100%;
    font-size: 14px;
`;
const UpdatedDate = styled.div`
    padding-left: 12px;
    font-size: 12px;
    color: gray;
`;
interface IProps {

}

const BottomMenu: React.FC<IProps> = () => {
    return (
        <Container>
            <LeftWrapper>
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
                </Icon>
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"/></svg>
                </Icon>
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/></svg>
                </Icon>

            </LeftWrapper>
            <RightWrapper>
                <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 2v17.582l-4-3.512-4 3.512v-17.582h8zm2-2h-12v24l6-5.269 6 5.269v-24z"/></svg>
                </Icon>
            </RightWrapper>
            <Favorites>좋아요 18개</Favorites>
            <UpdatedDate>5월 7일</UpdatedDate>
        </Container>
    )
};

export default BottomMenu;