import { NoSsr } from "@material-ui/core";
// @ts-ignore
import { Circle } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <NoSsr>
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
    </NoSsr>
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

const StyledLogo = styled(Image)`
  object-fit: contain;
  margin-bottom: 0.75rem;
`;
