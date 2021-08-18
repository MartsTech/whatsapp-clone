import IsAuth from "modules/auth/IsAuth";
import Chat from "modules/chat/Chat";
import ChatExists from "modules/chat/ChatExists";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "stores/store";

const ChatPage = () => {
  const { selectChat } = useStore().chatStore;
  const { selectRecipient } = useStore().recipientStore;
  const { loadMessages, messagesRegistery } = useStore().messageStore;
  const id = useRouter().query.id as string;

  useEffect(() => {
    const loadData = async () => {
      loadMessages(id);
      const chat = await selectChat(id);
      await selectRecipient(chat.users);
    };
    if (id) {
      loadData();
    }
  }, [id, selectChat, selectRecipient, loadMessages, messagesRegistery]);

  return (
    <IsAuth>
      <ChatExists id={id}>
        <Chat />
      </ChatExists>
    </IsAuth>
  );
};

export default ChatPage;
