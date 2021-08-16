import { Button } from "@material-ui/core";
import styled from "styled-components";

const SidebarSearchButton = () => {
  return <StyledButton>Start a new chat</StyledButton>;
};

export default SidebarSearchButton;

const StyledButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
