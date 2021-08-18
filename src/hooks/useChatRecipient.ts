import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { ChatRecipient } from "types/chat";

const useChatRecipient = (email: string) => {
  const { loadRecipient } = useStore().recipientStore;
  const [recipient, setRecipient] = useState<ChatRecipient>();

  useEffect(() => {
    const getRecipient = async () => {
      const recipient = await loadRecipient(email);
      setRecipient(recipient);
    };
    getRecipient();
  }, [email, loadRecipient]);

  return [recipient] as const;
};

export default useChatRecipient;
