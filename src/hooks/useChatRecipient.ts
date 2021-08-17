import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { ChatRecipient } from "types/chat";

const useChatRecipient = (email: string) => {
  const { loadRecipient } = useStore().chatStore;
  const [recepient, setRecepient] = useState<ChatRecipient>();

  useEffect(() => {
    const getRecipient = async () => {
      const recepient = await loadRecipient(email);
      setRecepient(recepient);
    };
    getRecipient();
  }, [email, loadRecipient]);

  return [recepient] as const;
};

export default useChatRecipient;
