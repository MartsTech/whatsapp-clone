import { NoSsr } from "@material-ui/core";
// @ts-ignore
import { Circle } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <NoSsr>
      <StyledWrapper>
        <StyledContainer>
          <StyledLogo
            src="/images/logo.png"
            width={200}
            height={200}
            alt="logo"
          />
          <Circle color="#3CBC28" size={60} />
        </StyledContainer>
      </StyledWrapper>
    </NoSsr>
  );
};

export default Loading;

const StyledWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled(Image)`
  object-fit: contain;
  margin-bottom: 0.75rem;
`;
