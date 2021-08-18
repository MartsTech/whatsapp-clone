import styled from "styled-components";
import { ChatMessage } from "types/chat";

interface ChatMessagesItemProps {
  data: ChatMessage;
}

const ChatMessagesItem: React.FC<ChatMessagesItemProps> = ({ data }) => {
  const { message } = data;

  return <StyledContainer>{message}</StyledContainer>;
};

export default ChatMessagesItem;

const StyledContainer = styled.div``;
