import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import { User } from "../../types/resolvers";

const Container = styled.div`
    display: flex;
    padding: 15px 10px;
    box-sizing: border-box;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dfdfdf;
`;
const LeftMenu = styled.div`
    display: flex;
    justify-self: start;
    align-items: center;
    svg {
        padding-right: 15px;
    }
    padding: 10px;
`;
const MainTitle = styled.span`
    position: relative;
    padding-left: 15px;
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 100%;
        width: 1px;
        background-color: black;
    }
    font-size: 25px;
`;
const LinkWrapper = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 15px;
`;
const GetAllBoards = styled(LinkWrapper)`

`;
const GetNotification = styled(LinkWrapper)`

`;
const EditProfile = styled(LinkWrapper)`

`;
const RightMenu = styled.div`
    display: flex;
    justify-self: right;
    align-items: center;
    padding: 10px;
    margin-left: -15px;
`;
const SearchBar = styled.div`
    position: relative;
    @media(max-width: 630px) {
        display: none;
    }
`;
const SearchInput = styled.input`
    margin: 0;
    border: 1px solid #dfdfdf;
    padding: 5px 28px;
    width: 250px;
    height: 30px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #dfdfdf;
    outline: none;
    &:focus,
    &:focus-within {
        border: 1px solid gray;
        &~ span {
            display: none;
        }
        & ~ ul {
            display: block;
        }
    }
    & ~ ul:active,
    & ~ ul:focus {
        display: block;
    }
    & + svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        fill: darkgray;
    }
    & ~ svg {
        &:nth-of-type(2) {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            fill: darkgray;
        }
    }
`;
const SearchTitle = styled.span`
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    color: #bdbdbd;
    background-color: #fafafa;
    border: 1px solid #dfdfdf;
    font-size: 14px;
    &.active {
        display: none;
    }
    & > svg {
        padding: 0 5px;
        fill: #bdbdbd;
    }
`;
const UsersProfile = styled.ul`
    position: absolute;
    display: none;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 110%;
    max-height: 400px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 4px 8px rgba(0,0,0, .22);
    border-radius: 2px;
`;
const Arrow = styled.div`
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -70%)  rotateZ(90deg);
    width: 0px;
    height: 0px;
    border-top: 20px solid transparent;
    border-right: 20px solid #f5f5f5;
    border-bottom: 20px solid transparent;
`;
const UserProfile = styled.li`
    display: flex;
    padding: 15px 5px;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    &.active {
        background-color: rgba(230,230,230,0.4);
    }
`;
const UserPhoto = styled.div`
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 10px;
`;
const Photo = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    background-color: white;
`;
const UserDetails = styled.ul`
`;

const UserNickName = styled.p`
    font-weight: bold;
    color: #464646;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px;
`;
const UserName = styled.p`
    margin-top: 1px;
    color: #adadad;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px;
`;
const NullText = styled.p`
    padding: 10px;
    font-size: 16px;
    color: #929292;
    text-align: center;
`;
interface IProps {
    fullName?: string;
    email?: string;
    nickName: string;
    searchInput: any;
    currentSearchIndex: number;
    searchUsers: Array<User> | null
}
const NavBarPresenter: React.FC<IProps> = ({
    fullName="",
    email="",
    nickName,
    searchInput,
    currentSearchIndex,
    searchUsers
}) => (
    <Container>
        <Link to={"/"}>
            <LeftMenu>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4c2.205 0 4 1.794 4 4s-1.795 4-4 4zm7-10c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1z"/></svg>
                <MainTitle className={"font-app-title"}>Westargram</MainTitle>
            </LeftMenu>
        </Link>
        <SearchBar>
            <SearchInput placeholder={"검색"} { ...searchInput } onKeyDown={e => {searchInput.handleKeyDown(e.keyCode, searchUsers ? searchUsers.length : -1);}}/>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
            <SearchTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
                {
                    searchInput.value !== "" ? searchInput.value : "검색"
                }
            </SearchTitle>
            <UsersProfile>
                {
                    searchUsers && searchInput.value !== "" && <Arrow />
                }
                <Wrapper>
                    {
                        searchUsers && searchUsers.map((user, key) => {
                            return (
                                <Link to={`/${user.nickName}`} key={user.id}>
                                    <UserProfile className={key === currentSearchIndex ? "active" : ""}>
                                        <UserPhoto>
                                            <Photo src={"http://image.dongascience.com/Photo/2018/12/2d5efe44bdd02f3e2ec4e99189d89d18.jpg"} />
                                        </UserPhoto>
                                        <UserDetails>
                                            <UserNickName>{user.nickName}</UserNickName>
                                            <UserName>{user.fullName}</UserName>
                                        </UserDetails>
                                    </UserProfile>
                                </Link>
                            )
                        })
                    }
                    {
                        searchInput.value !== "" && searchUsers &&
                        searchUsers.length <= 0 && <NullText>No results</NullText>
                    }
                </Wrapper>
            </UsersProfile>
        </SearchBar>
        <RightMenu>
            <Link to={"/followers"}>
                <GetAllBoards>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.144 8.171c-.035-.066.342-.102.409-.102.074.009-.196.452-.409.102zm-2.152-3.072l.108-.031c.064.055-.072.095-.051.136.086.155.021.248.008.332-.014.085-.104.048-.149.093-.053.066.258.075.262.085.011.033-.375.089-.304.171.096.136.824-.195.708-.176.225-.113.029-.125-.097-.19-.043-.215-.079-.547-.213-.68l.088-.102c-.206-.299-.36.362-.36.362zm13.008 6.901c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12s5.372-12 12-12c6.627 0 12 5.373 12 12zm-8.31-5.371c-.006-.146-.19-.284-.382-.031-.135.174-.111.439-.184.557-.104.175.567.339.567.174.025-.277.732-.063.87-.025.248.069.643-.226.211-.381-.355-.13-.542-.269-.574-.523 0 0 .188-.176.106-.166-.218.027-.614.786-.614.395zm6.296 5.371c0-1.035-.177-2.08-.357-2.632-.058-.174-.189-.312-.359-.378-.256-.1-1.337.597-1.5.254-.107-.229-.324.146-.572.008-.12-.066-.454-.515-.605-.46-.309.111.474.964.688 1.076.201-.152.852-.465.992-.038.268.804-.737 1.685-1.251 2.149-.768.694-.624-.449-1.147-.852-.275-.211-.272-.66-.55-.815-.124-.07-.693-.725-.688-.813l-.017.166c-.094.071-.294-.268-.315-.321 0 .295.48.765.639 1.001.271.405.416.995.748 1.326.178.178.858.914 1.035.898.193-.017.803-.458.911-.433.644.152-1.516 3.205-1.721 3.583-.169.317.138 1.101.113 1.476-.029.433-.37.573-.693.809-.346.253-.265.745-.556.925-.517.318-.889 1.353-1.623 1.348-.216-.001-1.14.36-1.261.007-.094-.256-.22-.45-.353-.703-.13-.248-.015-.505-.173-.724-.109-.152-.475-.497-.508-.677-.002-.155.117-.626.28-.708.229-.117.044-.458.016-.656-.048-.354-.267-.646-.53-.851-.389-.299-.188-.537-.097-.964 0-.204-.124-.472-.398-.392-.564.164-.393-.44-.804-.413-.296.021-.538.209-.813.292-.346.104-.7-.082-1.042-.125-1.407-.178-1.866-1.786-1.499-2.946.037-.19-.114-.542-.048-.689.158-.352.48-.747.762-1.014.158-.15.361-.112.547-.229.287-.181.291-.553.572-.781.4-.325.946-.318 1.468-.388.278-.037 1.336-.266 1.503-.06 0 .038.191.604-.019.572.433.023 1.05.749 1.461.579.211-.088.134-.736.567-.423.262.188 1.436.272 1.68.069.15-.124.234-.93.052-1.021.116.115-.611.124-.679.098-.12-.044-.232.114-.425.025.116.055-.646-.354-.218-.667-.179.131-.346-.037-.539.107-.133.108.062.18-.128.274-.302.153-.53-.525-.644-.602-.116-.076-1.014-.706-.77-.295l.789.785c-.039.025-.207-.286-.207-.059.053-.135.02.579-.104.347-.055-.089.09-.139.006-.268 0-.085-.228-.168-.272-.226-.125-.155-.457-.497-.637-.579-.05-.023-.764.087-.824.11-.07.098-.13.201-.179.311-.148.055-.287.126-.419.214l-.157.353c-.068.061-.765.291-.769.3.029-.075-.487-.171-.453-.321.038-.165.213-.68.168-.868-.048-.197 1.074.284 1.146-.235.029-.225.046-.487-.313-.525.068.008.695-.246.799-.36.146-.168.481-.442.724-.442.284 0 .223-.413.354-.615.131.053-.07.376.087.507-.01-.103.445.057.489.033.104-.054.684-.022.594-.294-.1-.277.051-.195.181-.253-.022.009.34-.619.402-.413-.043-.212-.421.074-.553.063-.305-.024-.176-.52-.061-.665.089-.115-.243-.256-.247-.036-.006.329-.312.627-.241 1.064.108.659-.735-.159-.809-.114-.28.17-.509-.214-.364-.444.148-.235.505-.224.652-.476.104-.178.225-.385.385-.52.535-.449.683-.09 1.216-.041.521.048.176.124.104.324-.069.19.286.258.409.099.07-.092.229-.323.298-.494.089-.222.901-.197.334-.536-.374-.223-2.004-.672-3.096-.672-.236 0-.401.263-.581.412-.356.295-1.268.874-1.775.698-.519-.179-1.63.66-1.808.666-.065.004.004-.634.358-.681-.153.023 1.247-.707 1.209-.859-.046-.18-2.799.822-2.676 1.023.059.092.299.092-.016.294-.18.109-.372.801-.541.801-.505.221-.537-.435-1.099.409l-.894.36c-1.328 1.411-2.247 3.198-2.58 5.183-.013.079.334.226.379.28.112.134.112.712.167.901.138.478.479.744.74 1.179.154.259.41.914.329 1.186.108-.178 1.07.815 1.246 1.022.414.487.733 1.077.061 1.559-.217.156.33 1.129.048 1.368l-.361.093c-.356.219-.195.756.021.982 1.818 1.901 4.38 3.087 7.22 3.087 5.517 0 9.989-4.472 9.989-9.989zm-11.507-6.357c.125-.055.293-.053.311-.22.015-.148.044-.046.08-.1.035-.053-.067-.138-.11-.146-.064-.014-.108.069-.149.104l-.072.019-.068.087.008.048-.087.106c-.085.084.002.139.087.102z"/></svg>
                </GetAllBoards>
            </Link>
            <GetNotification>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
            </GetNotification>
            <Link to={{
                pathname: `/${nickName}`,
                state: {
                    isUser: true
                }
            }}>
            <EditProfile>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z"/></svg>
            </EditProfile>
            </Link>
        </RightMenu>
    </Container>
);

export default NavBarPresenter;