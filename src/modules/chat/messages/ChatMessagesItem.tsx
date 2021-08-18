import styled from "styled-components";
import { ChatMessage } from "types/chat";

interface ChatMessagesItemProps {
  message: ChatMessage;
}

const ChatMessagesItem: React.FC<ChatMessagesItemProps> = ({ message }) => {
  const {} = message;

  return <StyledContainer></StyledContainer>;
};

export default ChatMessagesItem;

const StyledContainer = styled.div``;
