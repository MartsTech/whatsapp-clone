import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Chat, ChatRecipient } from "types/chat";
import validateEmail from "utils/validateEmail";
import { store } from "./store";

class ChatStore {
  chatsRegistery = new Map<string, Chat>();
  recipientsRegistery = new Map<string, ChatRecipient>();
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

  setChatsQuery = (
    chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> | null
  ) => {
    this.chatsQuery = chatsQuery;
  };

  getRecipientEmail = (users: string[]) => {
    return users.find((user) => user !== store.userStore.user?.email) || "";
  };

  loadRecipient = async (email: string) => {
    if (this.recipientsRegistery.has(email)) {
      return this.recipientsRegistery.get(email);
    }

    let user: ChatRecipient;

    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    const userDoc = userSnapshot?.docs?.[0];

    if (userDoc) {
      user = {
        ...userDoc.data(),
      } as ChatRecipient;
    } else {
      user = { email };
    }

    this.recipientsRegistery.set(user.email, user);

    return user;
  };
}

export default ChatStore;
