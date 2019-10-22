import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
border: 1px solid #dfdfdf;
padding: 30px 40px;
background-color: white;
    @media(max-width: 450px) {
        background-color: inherit;
        border: none;
    }
`; 
interface IProps {
    className?: string
}
const LoginBar: React.FC<IProps> = ({
    children,
    className
    
}) => {
    return (
        <Container className={className}>
            {
                children
            }
        </Container>
    )
}

export default LoginBar;