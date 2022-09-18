import styled from 'styled-components';

export const colours = {
    primary: 'rgb(51,51,51)',
    link: "rgb(3,120,124)",
    linkHover: "rgb(213,17,31)",
    background: 'rgb(243,242,241)',
    backgroundHover: 'rgb(237,235,233)',
    dark2: "#4B5563",
    dark3: "#9CA3AF",
    red: "#DC2626"
};

export const styledContainer = styled.div`
    max-width: 380px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20%;
`;

export const styledSubTitle = styled.h2`
    font-size: 20px;
    text-align: center;
    color: ${(props) => props.color ? props.color: colours.primary};
    pardding: 5px;
    margin-bottom: 20px;
`;

export const StyledText = styled.p`
    font-size: 14px;
    text-align: center;
    color: ${(props) => props.color ? props.color: colours.primary};
    pardding: 5px;
    margin-bottom: 25px;
`;

export const StyledTable = styled.table`
    border-collapse: collapse;
    width: 50%;
    display: flex;
    position: fixed;
    margin-left: 30%;
`;

export const StyledTh = styled.th`
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: none;
    color: black;
`;

export const StyledTd = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

export const StyledTr = styled.tr`
    nth-child(even){background-color: #f2f2f2;}
    
    &:hover{
        background-color: #ddd;
    }
`;

export const StyledModal = styled.div`
background-color: #fefefe;
margin: auto;
padding: 20px;
border: 1px solid #888;
width: 80%;
`;
