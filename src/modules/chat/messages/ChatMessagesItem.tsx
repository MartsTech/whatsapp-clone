import moment from "moment";
import React, { forwardRef } from "react";
import { useStore } from "stores/store";
import styled from "styled-components";
import { ChatMessage } from "types/chat";

interface ChatMessagesItemProps {
  data: ChatMessage;
}

// eslint-disable-next-line react/display-name
const ChatMessagesItem: React.FC<ChatMessagesItemProps> = forwardRef(
  ({ data }, ref: any) => {
    const email = useStore().userStore.user!.email;
    const { message, user, timestamp } = data;

    const MessageType = user === email ? StyledSender : StyledReceiver;

    return (
      <StyledContainer ref={ref}>
        <MessageType>
          {message}
          <StyledTimestamp>{moment(timestamp).format("LT")}</StyledTimestamp>
        </MessageType>
      </StyledContainer>
    );
  }
);

export default ChatMessagesItem;

const StyledContainer = styled.div``;

const StyledMessage = styled.p`
  width: fit-content;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.75rem;
  min-width: 4.25rem;
  padding-bottom: 1.75rem;
  position: relative;
`;

const StyledSender = styled(StyledMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
  text-align: right;
`;

const StyledReceiver = styled(StyledMessage)`
  background-color: whitesmoke;
  text-align: left;
`;

const StyledTimestamp = styled.span`
  color: gray;
  padding: 0.75rem;
  font-size: 0.6rem;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;
