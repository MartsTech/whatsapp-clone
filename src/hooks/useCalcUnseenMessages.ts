import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { Chat } from "types/chat";

const useCalcUnseenMessages = (chats: Chat[], chatId: string) => {
  const { getUnseenMessagesCount } = useStore().chatStore;
  const [unseenMessages, setUnseenMessages] = useState(0);

  useEffect(() => {
    const countUnseenMessages = async () => {
      const count = getUnseenMessagesCount(chatId) || 0;
      setUnseenMessages(count);
    };
    if (chats) {
      countUnseenMessages();
    }
  }, [chats, chatId, getUnseenMessagesCount]);

  return [unseenMessages] as const;
};

export default useCalcUnseenMessages;
