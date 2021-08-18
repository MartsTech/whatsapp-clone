import { db } from "config/firebase";
import { makeAutoObservable } from "mobx";
import { ChatMessage } from "types/chat";

class MessageStore {
  messagesRegistery = new Map<string, ChatMessage>();

  constructor() {
    makeAutoObservable(this);
  }

  get messages() {
    return Array.from(this.messagesRegistery.values());
  }

  loadMessages = async (id: string) => {
    this.messagesRegistery.clear();

    const messagesQuery = await db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc");

    messagesQuery.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (this.messagesRegistery.has(id)) {
          return;
        }

        const data = {
          id: doc.id,
          ...doc.data(),
        } as ChatMessage;

        const message = {
          ...data,
          timestamp: data.timestamp.toDate().getTime(),
        } as ChatMessage;

        this.messagesRegistery.set(message.id, message);
      });
    });
  };

  sendMessage = (message: string) => {};
}

export default MessageStore;
