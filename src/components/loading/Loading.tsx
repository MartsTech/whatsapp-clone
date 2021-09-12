import { NoSsr } from "@material-ui/core";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Loading = () => (
  <NoSsr>
    <StyledWrapper>
      <StyledContainer>
        <StyledLogo
          src="/images/logo.png"
          width={200}
          height={200}
          alt="logo"
        />
        <ClipLoader color="#3CBC28" size={60} />
      </StyledContainer>
    </StyledWrapper>
  </NoSsr>
);

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
