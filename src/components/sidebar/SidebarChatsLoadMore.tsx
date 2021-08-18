import { Button } from "@material-ui/core";
import { useStore } from "stores/store";
import styled from "styled-components";

const SidebarLoadMore = () => {
  const { loadMore, hasMore } = useStore().chatStore;

  if (!hasMore) return null;

  return <StyledButton onClick={loadMore}>Load more</StyledButton>;
};

export default SidebarLoadMore;

const StyledButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
