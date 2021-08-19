import { Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";

const SidebarLoadMore = () => {
  const { loadMore, hasMore, chats, chatsLimit } = useStore().chatStore;

  if (!hasMore || chats.length < chatsLimit) return null;

  return <StyledButton onClick={loadMore}>Load more</StyledButton>;
};

export default observer(SidebarLoadMore);

const StyledButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
