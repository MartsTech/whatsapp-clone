import { Avatar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";

const SidebarHeaderAvatar = () => {
  const { user, signOut } = useStore().userStore;

  return <StyledAvatar onClick={signOut} src={user?.photoURL} alt="avatar" />;
};

export default observer(SidebarHeaderAvatar);

const StyledAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
