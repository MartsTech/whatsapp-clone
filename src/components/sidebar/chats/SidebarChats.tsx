import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import SidebarChatsItem from "./SidebarChatsItem";

const SidebarChats = () => {
  const { chats } = useStore().chatStore;

  return (
    <>
      {chats.map((chat) => {
        return <SidebarChatsItem key={chat.id} chat={chat} />;
      })}
    </>
  );
};

export default observer(SidebarChats);
