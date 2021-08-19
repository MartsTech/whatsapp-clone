import Loading from "components/loading/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";

interface ChatExistsProps {
  id: string;
}

const ChatExists: React.FC<ChatExistsProps> = ({ children, id }) => {
  const { validateChat } = useStore().chatStore;
  const [exists, setExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleValidateChat = async () => {
      const exists = await validateChat(id);
      setExists(exists);

      if (!exists) {
        router.push("/");
      }
    };
    if (id) {
      handleValidateChat();
    }
  }, [id, validateChat, router]);

  if (exists) {
    return <>{children}</>;
  }

  return <Loading />;
};

export default ChatExists;
