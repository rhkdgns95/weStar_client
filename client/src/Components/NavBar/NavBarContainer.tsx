import React, { useState, useEffect } from "react";
import NavBarPresenter from "./NavBarPresenter";
import { useAuth } from "../../Auth";
import { useApolloClient, useQuery } from "react-apollo-hooks";
import { GET_SEARCH_USERS } from "./NavBarQueries";
import { GetUsersResponse, GetUsersQueryVariables } from "../../types/resolvers";

const useInput = (defaultValue: string) => {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const [ value, setValue ] = useState(defaultValue);
    const [ currentIndex, setCurrentIndex ] = useState(-1);

    const Down = (lastIndex: number) => {
        if(currentIndex < lastIndex - 1) { setCurrentIndex(currentIndex + 1); }
    }       
    const Up = () => {
        if(currentIndex > 0) { setCurrentIndex(currentIndex - 1); }
    }
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value } } = event;
        console.log("onChange: ", value);
        setValue(value);
        setCurrentIndex(-1);
    };
    const handleKeyDown = (keyCode: number, lastIndex: number) => {
        if(keyCode === KEY_UP || keyCode === KEY_DOWN) {
            switch(keyCode) {
                case KEY_UP: 
                    Up();
                    break;
                case KEY_DOWN:
                    Down(lastIndex);
                    break;
                default: 
                    break;
            }
        }
    }
    return {
        value,
        onChange,
        handleKeyDown,
        currentIndex
    };
};

const NavBarContainer = () => {
    const { user, loadingUserProfile: loading } = useAuth();
    const input = useInput("");
    
    const skip: boolean = input.value === "" ? true : false;    
    console.log("SKIP: ", skip);
    const { data: { GetUsers: { ok=false, error=null, users: searchUsers = []} = {}} = {}, loading: loadingGetUsers } = useQuery<GetUsersResponse, GetUsersQueryVariables>(GET_SEARCH_USERS, {
        variables: {
            name: input.value
        },
        skip
    });
    if(!user) {
        return <React.Fragment></React.Fragment>
    } 
    const { fullName, email, nickName } = user;
    return (
        <NavBarPresenter 
            fullName={fullName}
            email={email}
            nickName={nickName}
            searchInput={input}
            currentSearchIndex={input.currentIndex}
            searchUsers={searchUsers}
        />
    )
};

export default NavBarContainer;