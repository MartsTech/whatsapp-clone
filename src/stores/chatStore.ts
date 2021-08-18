import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Chat } from "types/chat";
import validateEmail from "utils/validateEmail";
import { store } from "./store";

class ChatStore {
  chatsRegistery = new Map<string, Chat>();
  selectedChat: Chat | null = null;
  chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> | null =
    null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.chatsQuery,
      async (chatsQuery) => {
        if (!chatsQuery) {
          return;
        }

        const chatsSnapshot = await chatsQuery.limit(10).get();

        chatsSnapshot.docs.forEach((doc) => {
          if (this.chatsRegistery.has(doc.id)) {
            return;
          }

          const chat = {
            id: doc.id,
            users: doc.data().users,
          } as Chat;

          runInAction(() => {
            this.chatsRegistery.set(chat.id, chat);
          });
        });
      }
    );
  }

  get chats() {
    return Array.from(this.chatsRegistery.values());
  }

  createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with."
    );

    if (!input) {
      return;
    }

    if (!validateEmail(input)) {
      toast.error("Invalid Email.");
      return;
    }

    const { user } = store.userStore;

    if (!user) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    if (input === user.email) {
      toast.error("Please enter a different email address.");
      return;
    }

    const chatExists = this.chatExists(input);

    if (chatExists) {
      toast.error("Chat already exists.");
      return;
    }

    db.collection("chats").add({
      users: [user.email, input],
    });
  };

  private chatExists = (recipientEmail: string) => {
    const exists = !!this.chats.find((chat) =>
      chat.users.includes(recipientEmail)
    );

    return exists;
  };

  selectChat = async (id: string) => {
    if (this.chatsRegistery.has(id)) {
      this.selectedChat = this.chatsRegistery.get(id) as Chat;
      return this.selectedChat;
    }

    const chatSnapshot = await db.collection("chats").doc(id).get();

    const chat = {
      id: chatSnapshot.id,
      users: chatSnapshot.data()?.users,
    } as Chat;

    runInAction(() => {
      if (chat.users) {
        this.chatsRegistery.set(id, chat);
        this.selectedChat = chat;
      }
    });

    return chat;
  };

  validateChat = async (id: string) => {
    if (this.chatsRegistery.has(id)) {
      return true;
    }

    const chatSnapshot = await db.collection("chats").doc(id).get();

    if (chatSnapshot.exists) {
      return true;
    }

    return false;
  };

  setChatsQuery = (
    chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> | null
  ) => {
    this.chatsQuery = chatsQuery;
  };
}

export default ChatStore;
