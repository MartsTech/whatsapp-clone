import { Avatar } from "@material-ui/core";
import useChatRecipient from "hooks/useChatRecipient";
import { useStore } from "stores/store";
import styled from "styled-components";
import { Chat } from "types/chat";

interface SidebarChatsItemProps {
  chat: Chat;
}

const SidebarChatsItem: React.FC<SidebarChatsItemProps> = ({ chat }) => {
  const { users } = chat;

  const { getRecipientEmail } = useStore().chatStore;
  const recipientEmail = getRecipientEmail(users);
  const [recipient] = useChatRecipient(recipientEmail);

  if (!recipient) {
    return null;
  }

  const { email, photoURL } = recipient;

  return (
    <StyledContainer>
      <StyledAvatar src={photoURL} alt="avatar">
        {email[0]}
      </StyledAvatar>
      <StyledEmail>{email}</StyledEmail>
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

  :hover {
    background-color: #e9eaeb;
  }
`;

const StyledAvatar = styled(Avatar)`
  margin: 0.25rem 0;
  margin-right: 1rem;
  text-transform: uppercase;
`;

const StyledEmail = styled.p``;
