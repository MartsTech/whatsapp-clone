// @ts-ignore
import { Circle } from "better-react-spinkit";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledContainer>
      <StyledLoading>
        <StyledLogo
          src="/images/logo.png"
          width={200}
          height={200}
          alt="logo"
        />
        <Circle color="#3CBC28" size={60} />
      </StyledLoading>
    </StyledContainer>
  );
};

export default Loading;

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled.img`
  object-fit: contain;
  margin-bottom: 0.75rem;
`;
