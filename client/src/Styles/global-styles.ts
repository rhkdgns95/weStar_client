import { createGlobalStyle, keyframes } from "./typed-components";

export const GlobalStyles = createGlobalStyle`
    html {
        overflow-y: scroll;
    }
    html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        height: 100%;
        background-color: #fafafa;
    }
    * {
        box-sizing: border-box;
    }
    ul, li, p{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .error {
        animation: ${keyframes => Shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    .font-app-title {
       @import url('https://fonts.googleapis.com/css?family=Lobster+Two&display=swap');
       font-family: 'Lobster Two', cursive;
    }
`;

const Shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;