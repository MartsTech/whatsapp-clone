import styled from "styled-components";
import SidebarChats from "./chats/SidebarChats";
import SidebarHeader from "./header/SidebarHeader";
import SidebarSearch from "./search/SidebarSearch";

const Sidebar = () => {
  return (
    <StyledContainer>
      <SidebarHeader />
      <SidebarSearch />
      <SidebarChats />
    </StyledContainer>
  );
};

export default Sidebar;

const StyledContainer = styled.section``;
