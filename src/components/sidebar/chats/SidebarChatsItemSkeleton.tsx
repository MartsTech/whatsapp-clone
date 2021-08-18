import { Avatar, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";

const SidebarChatsItemSkeleton = () => {
  return (
    <StyledContainer>
      <Skeleton variant="circle">
        <Avatar alt="avatar" />
      </Skeleton>
      <StyledSpacer />
      <Skeleton width="100%">
        <Typography>.</Typography>
      </Skeleton>
    </StyledContainer>
  );
};

export default SidebarChatsItemSkeleton;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const StyledSpacer = styled.div`
  width: 1.2rem;
`;
