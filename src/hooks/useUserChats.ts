import { db } from "config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useStore } from "stores/store";

const useUserChats = () => {
  const { user } = useStore().userStore;

  const userChatsRef = db
    .collection("chats")
    .where("users", "array-contains", user!.email);

  const [chatsSnapshot] = useCollection(userChatsRef);

  return [chatsSnapshot] as const;
};

export default useUserChats;
