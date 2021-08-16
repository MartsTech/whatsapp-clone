import { Avatar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";

const SidebarHeaderAvatar = () => {
  const { user, signOut } = useStore().userStore;

  return <StyledAvatar src={user?.photoURL} onClick={signOut} />;
};

export default observer(SidebarHeaderAvatar);

const StyledAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
