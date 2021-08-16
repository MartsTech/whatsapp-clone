import { Button } from "@material-ui/core";
import { useStore } from "stores/store";
import styled from "styled-components";

const SidebarSearchButton = () => {
  const { createChat } = useStore().chatStore;

  return <StyledButton onClick={createChat}>Start a new chat</StyledButton>;
};

export default SidebarSearchButton;

const StyledButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
