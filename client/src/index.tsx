import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { client } from './apollo';
import { GlobalStyles } from './Styles/global-styles';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'; 
import App from './Router/App';

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloProviderHooks client={client} >
            <ToastContainer position={"bottom-center"} autoClose={3000} />
            <App />
            <GlobalStyles />
        </ApolloProviderHooks>
    </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA