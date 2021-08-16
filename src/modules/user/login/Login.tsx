import Image from "next/image";
import styled from "styled-components";
import LoginSignInButton from "./LoginSignInButton";

const Login = () => {
  return (
    <StyledContainer>
      <StyledLogin>
        <Image
          src="/images/logo.png"
          width={200}
          height={200}
          objectFit="contain"
          alt="logo"
        />
        <LoginSignInButton />
      </StyledLogin>
    </StyledContainer>
  );
};

export default Login;

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6.25rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
