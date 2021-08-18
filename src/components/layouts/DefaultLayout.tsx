import Sidebar from "components/sidebar/Sidebar";
import styled from "styled-components";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <StyledContainer>
      <Sidebar />
      {children}
    </StyledContainer>
  );
};

export default DefaultLayout;

const StyledContainer = styled.div`
  display: flex;
`;
