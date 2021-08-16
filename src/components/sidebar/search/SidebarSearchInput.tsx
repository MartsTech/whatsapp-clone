import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const SidebarSearchInput = () => {
  return (
    <StyledContainer>
      <SearchIcon />
      <StyledInput placeholder="Search in chats" />
    </StyledContainer>
  );
};

export default SidebarSearchInput;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border-radius: 2px;
`;

const StyledInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
