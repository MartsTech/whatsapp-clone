import { db } from "config/firebase";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Chat } from "types/chat";
import validateEmail from "utils/validateEmail";
import { store } from "./store";
import firebase from "firebase/app";

class ChatStore {
  chatsRegistery = new Map<string, Chat>();
  chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> | null =
    null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.chatsQuery,
      (chatsQuery) => {
        if (!chatsQuery) {
          return;
        }

        chatsQuery.onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const chat = {
              id: doc.id,
              ...doc.data(),
            } as Chat;

            runInAction(() => {
              this.chatsRegistery.set(chat.id, chat);
            });
          });
        });
      }
    );
  }

  get chats() {
    return Array.from(this.chatsRegistery.values());
  }

  setChatsQuery = (
    chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData>
  ) => {
    this.chatsQuery = chatsQuery;
  };

  createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with."
    );

    if (!input) {
      toast.error("No email provided.");
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

    const chatExists = await this.chatExists(user.email, input);

    if (chatExists) {
      toast.error("Chat already exists.");
      return;
    }

    db.collection("chats").add({
      users: [user.email, input],
    });
  };

  private chatExists = async (userEmail: string, recipientEmail: string) => {
    const chatsSnapshot = await db
      .collection("chats")
      .where("users", "array-contains", userEmail)
      .get();

    const exists = !!chatsSnapshot.docs.find((doc) =>
      doc.data().users.find((user: string) => user === recipientEmail)
    );

    return exists;
  };
}

export default ChatStore;
