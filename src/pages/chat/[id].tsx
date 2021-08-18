import IsAuth from "modules/auth/IsAuth";
import Chat from "modules/chat/Chat";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "stores/store";

const ChatPage = () => {
  const { selectChat } = useStore().chatStore;
  const { selectRecipient } = useStore().recipientStore;
  const { loadMessages } = useStore().messageStore;
  const id = useRouter().query.id as string;

  useEffect(() => {
    const loadData = async () => {
      const chat = await selectChat(id);
      await selectRecipient(chat.users);
      await loadMessages(id);
    };
    if (id) {
      loadData();
    }
  }, [id, selectChat, selectRecipient, loadMessages]);

  return (
    <IsAuth>
      <Chat />
    </IsAuth>
  );
};

export default ChatPage;
