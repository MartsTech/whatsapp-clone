import { observer } from "mobx-react-lite";
import FlipMove from "react-flip-move";
import { useStore } from "stores/store";
import styled from "styled-components";
import ChatMessagesEnd from "./ChatMessagesEnd";
import ChatMessagesItem from "./ChatMessagesItem";

const ChatMessages = () => {
  const { messages } = useStore().messageStore;

  return (
    <StyledContainer>
      <FlipMove>
        {messages.map((message) => (
          <ChatMessagesItem key={message.id} data={message} />
        ))}
      </FlipMove>
      <ChatMessagesEnd />
    </StyledContainer>
  );
};

export default observer(ChatMessages);

const StyledContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #e5ded8;
`;
