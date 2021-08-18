import { useStore } from "stores/store";
import styled from "styled-components";
import ChatMessagesItem from "./ChatMessagesItem";

const ChatMessages = () => {
  const { messages } = useStore().messageStore;

  return (
    <StyledContainer>
      {messages.map((message) => (
        <ChatMessagesItem key={message.id} message={message} />
      ))}
      <StyledMessagesEnd />
    </StyledContainer>
  );
};

export default ChatMessages;

const StyledContainer = styled.div`
  padding: 2rem;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const StyledMessagesEnd = styled.div``;
