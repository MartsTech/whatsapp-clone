import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStore } from "stores/store";
import styled from "styled-components";

const ChatMessagesEnd = () => {
  const { scrollToBottom, setScrollToBottom } = useStore().messageStore;
  const endMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToBottom) {
      endMessagesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setScrollToBottom(false);
    }
  }, [scrollToBottom, setScrollToBottom]);

  return <StyledEnd ref={endMessagesRef} />;
};

export default observer(ChatMessagesEnd);

const StyledEnd = styled.div`
  padding: 2rem 0;
`;
