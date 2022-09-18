import axios from 'axios';

const Home = () => {
    return(
        <div>
           <div></div>
            <StyledTitle size={65}>
                Welcome to BDSwiss 
            </StyledTitle>
            <StyledSubTitle size={27}>
                Feel free to register
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to='/Signup'>Signup</StyledButton>
                <StyledButton to='/Login'>Login</StyledButton>
            </ButtonGroup>
            
        </div>
    );
}

export default Home;