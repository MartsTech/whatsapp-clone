import { Avatar } from "@material-ui/core";
import useChatRecipient from "hooks/useChatRecipient";
import { useRouter } from "next/router";
import { useStore } from "stores/store";
import styled from "styled-components";
import { Chat } from "types/chat";
import SidebarChatsItemSkeleton from "./SidebarChatsItemSkeleton";

interface SidebarChatsItemProps {
  chat: Chat;
}

const SidebarChatsItem: React.FC<SidebarChatsItemProps> = ({ chat }) => {
  const { users, id } = chat;

  const { getRecipientEmail } = useStore().recipientStore;
  const router = useRouter();

  const recipientEmail = getRecipientEmail(users);
  const [recipient] = useChatRecipient(recipientEmail);

  if (!recipient) {
    return <SidebarChatsItemSkeleton />;
  }

  const { email, photoURL } = recipient;

  return (
    <StyledContainer onClick={() => router.push(`/chat/${id}`)}>
      <StyledAvatar src={photoURL} alt="avatar">
        {email[0]}
      </StyledAvatar>
      <StyledEmail>{recipient.email}</StyledEmail>
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
  text-transform: uppercase;
`;

const StyledEmail = styled.p`
  margin-left: 1rem;
`;
