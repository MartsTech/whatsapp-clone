import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth } from "../firebase/firebase";

const createChat = () => {
  const input = prompt(
    "Pleace enter an email address of the user you wish to chat with"
  );

  if (!input) {
    return;
  }

  if (EmailValidator.validate(input)) {
    // Add chat
  }
};

const Sidebar: React.FC = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <Header>
        <UserAvater onClick={signOut} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 15px;
  height: 80px;
  border: 1px solid whitesmoke;
`;

const UserAvater = styled(Avatar)`
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
