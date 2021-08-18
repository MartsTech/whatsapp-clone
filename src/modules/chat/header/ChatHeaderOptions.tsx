import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";

const ChatHeaderOptions = () => {
  return (
    <StyledContainer>
      <IconButton aria-label="file">
        <AttachFileIcon />
      </IconButton>
      <IconButton aria-label="more">
        <MoreVertIcon />
      </IconButton>
    </StyledContainer>
  );
};

export default ChatHeaderOptions;

const StyledContainer = styled.div`
  margin-left: auto;
`;
