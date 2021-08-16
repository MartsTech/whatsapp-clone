import styled from "styled-components";
import SidebarHeaderAvatar from "./SidebarHeaderAvatar";
import SidebarHeaderOptions from "./SidebarHeaderOptions";

const SidebarHeader = () => {
  return (
    <StyledHeader>
      <SidebarHeaderAvatar />
      <SidebarHeaderOptions />
    </StyledHeader>
  );
};

export default SidebarHeader;

const StyledHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 5rem;
  border-bottom: 1px solid whitesmoke;
`;
