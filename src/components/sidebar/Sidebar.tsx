import styled from "styled-components";
import SidebarChats from "./chats/SidebarChats";
import SidebarHeader from "./header/SidebarHeader";
import SidebarSearch from "./search/SidebarSearch";
import SidebarLoadMore from "./SidebarChatsLoadMore";

const Sidebar = () => {
  return (
    <StyledContainer>
      <StyledTop>
        <SidebarHeader />
        <SidebarSearch />
      </StyledTop>
      <SidebarChats />
      <SidebarLoadMore />
    </StyledContainer>
  );
};

export default Sidebar;

const StyledContainer = styled.section`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 18rem;
  max-width: 22rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none; /* IE and Edge*/
  scrollbar-width: none; /* Firefox */
`;

const StyledTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
`;
