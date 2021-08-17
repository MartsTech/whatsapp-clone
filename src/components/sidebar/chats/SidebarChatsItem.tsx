import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { Chat } from "types/chat";

interface SidebarChatsItemProps {
  chat: Chat;
}

const SidebarChatsItem: React.FC<SidebarChatsItemProps> = ({ chat }) => {
  const { users } = chat;

  return (
    <StyledContainer>
      <StyledAvatar alt="avatar" />
      <StyledEmail>{users[1]}</StyledEmail>
    </StyledContainer>
  );
};

export default SidebarChatsItem;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  word-break: break-word;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0.25rem 0;
  margin-right: 1rem;
`;

const StyledEmail = styled.p``;
