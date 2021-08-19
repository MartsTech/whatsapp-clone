import { observer } from "mobx-react-lite";
import FlipMove from "react-flip-move";
import { useStore } from "stores/store";
import SidebarChatsItem from "./SidebarChatsItem";

const SidebarChats = () => {
  const { chats } = useStore().chatStore;

  return (
    <FlipMove>
      {chats.map((chat) => {
        return <SidebarChatsItem key={chat.id} chat={chat} />;
      })}
    </FlipMove>
  );
};

export default observer(SidebarChats);
