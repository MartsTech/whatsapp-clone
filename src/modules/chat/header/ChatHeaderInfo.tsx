import { Avatar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";
import TimeAgo from "timeago-react";

const ChatHeaderInfo = () => {
  const { selectedRecipient } = useStore().recipientStore;

  if (!selectedRecipient) {
    return null;
  }

  const { email, photoURL, lastSeen } = selectedRecipient;

  return (
    <StyledContainer>
      <Avatar src={photoURL} alt="avatar" />
      <StyledInfo>
        <StyledEmail>{email}</StyledEmail>
        <StyledLastSeen>
          Last Active: {lastSeen && <TimeAgo datetime={lastSeen} />}
        </StyledLastSeen>
      </StyledInfo>
    </StyledContainer>
  );
};

export default observer(ChatHeaderInfo);

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInfo = styled.div`
  margin-left: 1rem;
`;

const StyledEmail = styled.h3`
  margin: 0;
`;

const StyledLastSeen = styled.p`
  margin: 0;
  font-size: 1rem;
  color: gray;
`;
