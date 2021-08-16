import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";

const SidebarHeaderOptions = () => {
  return (
    <StyledIconsContainer>
      <IconButton aria-label="chat">
        <ChatIcon />
      </IconButton>
      <IconButton aria-label="more">
        <MoreVertIcon />
      </IconButton>
    </StyledIconsContainer>
  );
};

export default SidebarHeaderOptions;

const StyledIconsContainer = styled.div``;
