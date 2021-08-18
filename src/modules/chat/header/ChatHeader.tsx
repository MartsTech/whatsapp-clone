import styled from "styled-components";
import ChatHeaderInfo from "./ChatHeaderInfo";
import ChatHeaderOptions from "./ChatHeaderOptions";

const ChatHeader = () => {
  return (
    <StyledHeader>
      <ChatHeaderInfo />
      <ChatHeaderOptions />
    </StyledHeader>
  );
};

export default ChatHeader;

const StyledHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 0.75rem;
  height: 5rem;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
