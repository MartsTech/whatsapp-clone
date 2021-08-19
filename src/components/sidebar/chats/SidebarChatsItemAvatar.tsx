import { Avatar, Badge } from "@material-ui/core";
import useCalcUnseenMessages from "hooks/useCalcUnseenMessages";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";
import { ChatRecipient } from "types/chat";

interface SidebarChatsItemAvatarProps {
  recipient: ChatRecipient;
  chatId: string;
}

const SidebarChatsItemAvatar: React.FC<SidebarChatsItemAvatarProps> = ({
  recipient,
  chatId,
}) => {
  const { photoURL, email } = recipient;
  const { chats } = useStore().chatStore;
  const [unseenMessages] = useCalcUnseenMessages(chats, chatId);

  return (
    <StyledBadge
      color="secondary"
      badgeContent={unseenMessages}
      overlap="circular"
    >
      <StyledAvatar src={photoURL} alt="avatar">
        {email[0]}
      </StyledAvatar>
    </StyledBadge>
  );
};

export default observer(SidebarChatsItemAvatar);

const StyledBadge = styled(Badge)``;

const StyledAvatar = styled(Avatar)`
  text-transform: uppercase;
`;
