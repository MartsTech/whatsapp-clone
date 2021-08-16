import { Button } from "@material-ui/core";
import { useStore } from "stores/store";
import styled from "styled-components";

const LoginSignInButton = () => {
  const { signIn } = useStore().userStore;

  return (
    <StyledButton onClick={signIn} variant="outlined">
      Sign in with Google
    </StyledButton>
  );
};

export default LoginSignInButton;

const StyledButton = styled(Button)`
  &&& {
    margin-top: 3rem;
  }
`;
