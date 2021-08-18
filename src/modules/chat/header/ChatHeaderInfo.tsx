import { Avatar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";

const ChatHeaderInfo = () => {
  const { selectedRecipient } = useStore().chatStore;

  if (!selectedRecipient) {
    return null;
  }

  const { email, lastSeen, photoURL } = selectedRecipient;

  return (
    <StyledContainer>
      <Avatar src={photoURL} alt="avatar" />
      <StyledInfo>
        <StyledEmail>{email}</StyledEmail>
        <StyledLastSeen>Last seen</StyledLastSeen>
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
