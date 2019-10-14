import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "../../Styles/typed-components";
import { theme } from "../../Styles/theme";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import { ProvideAuth } from "../../Auth";
import LoggedIn from "../LoggedIn";
import Home from "../Home";
import FindPassword from "../FindPassword";
import SignUp from "../SignUp";
import NavBar from "../../Components/NavBar";
import UserProfile from "../UserProfile";
import AppProvider from "./AppProvider";

const AppContainer = ({data: {auth: {isLoggedIn}}}) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter> 
            <AppPresenter isLoggedIn={isLoggedIn}/>
        </BrowserRouter>
    </ThemeProvider>
);

const AppPresenter: React.FC<{isLoggedIn: boolean}> = ({
    isLoggedIn
}) => (
    <AppProvider>
    {
        isLoggedIn ? (
            <ProvideAuth>
                <NavBar/>
                <UserLoggedIn/>
            </ProvideAuth>
        ) : <UserLoggedOut/>
    }    
    </AppProvider>
)


const UserLoggedIn: React.FC<any> = () => {
    return (
        <Switch>
            <Route path={"/"} exact={true} component={Home}/>
            <Route path={"/:nickName/tagged"} exact={true} component={UserProfile}/>
            <Route path={"/:nickName"} exact={true} component={UserProfile}/>
            <Redirect from={"*"} to={"/"}/>
        </Switch>
    )
};

const UserLoggedOut: React.FC<any> = () => (
    <Switch>
        <Route path={"/"} exact={true} component={LoggedIn}/>
        <Route path={"/find-password"} component={FindPassword}/>
        <Route path={"/sign-up"} component={SignUp}/>
        <Redirect from={"*"} to={"/"}/>
    </Switch>
);

export default graphql<any, any>(IS_LOGGED_IN)(AppContainer);
// export default graphql<any, {data: { auth: {isLoggedIn: boolean}}}>(IS_LOGGED_IN)(AppContainer);
// export default AppContainer;