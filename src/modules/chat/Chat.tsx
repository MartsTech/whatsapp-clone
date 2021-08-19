import DefaultLayout from "components/layouts/DefaultLayout";
import styled from "styled-components";
import ChatHeader from "./header/ChatHeader";
import ChatInput from "./input/ChatInput";
import ChatMessages from "./messages/ChatMessages";

const Chat = () => {
  return (
    <DefaultLayout>
      <StyledContainer>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </StyledContainer>
    </DefaultLayout>
  );
};

export default Chat;

const StyledContainer = styled.section`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
