import useUserChats from "hooks/useUserChats";
import { Chat } from "types/chat";
import SidebarChatsItem from "./SidebarChatsItem";

const SidebarChats = () => {
  const [chatsSnapshot] = useUserChats();

  return (
    <>
      {chatsSnapshot?.docs.map((doc) => {
        const chat = {
          id: doc.id,
          ...doc.data(),
        } as Chat;
        return <SidebarChatsItem key={chat.id} chat={chat} />;
      })}
    </>
  );
};

export default SidebarChats;
