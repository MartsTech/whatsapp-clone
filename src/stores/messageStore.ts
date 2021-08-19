import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { ChatMessage } from "types/chat";
import { store } from "./store";

class MessageStore {
  messagesRegistery = new Map<string, ChatMessage>();
  scrollToBottom = false;
  unsubscribeMessagesSnapshot?: () => void;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.messagesRegistery.clear();
    this.scrollToBottom = false;

    if (this.unsubscribeMessagesSnapshot) {
      this.unsubscribeMessagesSnapshot();
      this.unsubscribeMessagesSnapshot = undefined;
    }
  };

  get messages() {
    return Array.from(this.messagesRegistery.values());
  }

  loadMessages = (id: string) => {
    this.messagesRegistery.clear();

    if (this.unsubscribeMessagesSnapshot) {
      this.unsubscribeMessagesSnapshot();
    }

    const messagesQuery = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc");

    this.unsubscribeMessagesSnapshot = messagesQuery.onSnapshot((snapshot) => {
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
          timestamp: data.timestamp?.toDate().getTime(),
        } as ChatMessage;

        runInAction(() => {
          this.messagesRegistery.set(message.id, message);
        });
      });
    });
  };

  sendMessage = (message: string) => {
    const user = store.userStore.user;
    const chat = store.chatStore.selectedChat;
    const lastSeenUpdated = store.userStore.updateLastSeen();

    if (!chat || !user || !lastSeenUpdated) {
      toast.error("An error occurred. Please try again.");
      return false;
    }

    db.collection("chats").doc(chat.id).collection("messages").add({
      message,
      user: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return true;
  };

  setScrollToBottom = (state: boolean) => {
    this.scrollToBottom = state;
  };
}

export default MessageStore;
