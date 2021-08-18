import Loading from "components/loading/Loading";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";

interface ChatExistsProps {
  id: string;
}

const ChatExists: React.FC<ChatExistsProps> = ({ children, id }) => {
  const { chatsRegistery } = useStore().chatStore;
  const [exists, setExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (chatsRegistery.size > 0) {
      const exists = chatsRegistery.has(id);
      setExists(exists);

      if (!exists) {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [chatsRegistery, id, exists, router]);

  if (exists) {
    return <>{children}</>;
  }

  return <Loading />;
};

export default observer(ChatExists);
