import DefaultLayout from "components/layouts/DefaultLayout";
import styled from "styled-components";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";

const Chat = () => {
  return (
    <DefaultLayout>
      <StyledWrapper>
        <StyledContainer>
          <ChatHeader />
          <ChatMessages />
        </StyledContainer>
      </StyledWrapper>
    </DefaultLayout>
  );
};

export default Chat;

const StyledWrapper = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const StyledContainer = styled.div``;
