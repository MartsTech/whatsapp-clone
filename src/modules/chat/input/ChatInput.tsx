import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import styled from "styled-components";
import ChatInputField from "./ChatInputField";

const ChatInput = () => {
  return (
    <StyledInputContainer>
      <InsertEmoticonIcon />
      <ChatInputField />
      <MicIcon />
    </StyledInputContainer>
  );
};

export default ChatInput;

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
