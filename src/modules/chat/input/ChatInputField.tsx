import { useState } from "react";
import { useStore } from "stores/store";
import styled from "styled-components";

const ChatInputField = () => {
  const { sendMessage, setScrollToBottom } = useStore().messageStore;
  const [input, setInput] = useState("");

  const handleSendMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (input === "") {
      return;
    }
    const success = sendMessage(input);

    if (success) {
      setInput("");
      setScrollToBottom(true);
    }
  };

  return (
    <StyledForm>
      <StyledInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message"
        type="text"
      />
      <button hidden type="submit" onClick={handleSendMessage}>
        Send Message
      </button>
    </StyledForm>
  );
};

export default ChatInputField;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
`;

const StyledInput = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 0.75rem;
  background-color: whitesmoke;
  padding: 1.25rem;
  margin: 0 1rem;
`;
