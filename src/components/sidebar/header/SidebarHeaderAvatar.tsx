import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const SidebarHeaderAvatar = () => {
  return <StyledAvatar />;
};

export default SidebarHeaderAvatar;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
