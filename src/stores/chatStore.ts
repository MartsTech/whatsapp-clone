import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Chat, ChatMessage, ChatRecipient } from "types/chat";
import validateEmail from "utils/validateEmail";
import { store } from "./store";

class ChatStore {
  chatsRegistery = new Map<string, Chat>();
  recipientsRegistery = new Map<string, ChatRecipient>();
  messagesRegistery = new Map<string, Map<string, ChatMessage>>();
  selectedChat: Chat | null = null;
  selectedRecipient: ChatRecipient | null = null;
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
            if (this.chatsRegistery.has(doc.id)) {
              return;
            }

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

  getRecipientEmail = (users: string[]) => {
    return users?.find((user) => user !== store.userStore.user?.email) || "";
  };

  getMessages = async (id: string) => {
    const messages = this.messagesRegistery.get(id);

    if (!messages) {
      return;
    }

    const messagesQuery = await db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc");

    messagesQuery.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (messages.has(doc.id)) {
          return;
        }

        const message = {
          id: doc.id,
          ...doc.data(),
        } as ChatMessage;

        messages.set(message.id, message);
      });
    });

    this.messagesRegistery.set(id, messages);
  };

  createChat = async () => {
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
    let exists = false;

    exists = !!this.chats.find((chat) => chat.users.includes(recipientEmail));

    if (exists) {
      return true;
    }

    const chatsSnapshot = await db
      .collection("chats")
      .where("users", "array-contains", userEmail)
      .get();

    exists = !!chatsSnapshot.docs.find((doc) =>
      doc.data().users.find((user: string) => user === recipientEmail)
    );

    return exists;
  };

  loadRecipient = async (email: string) => {
    if (this.recipientsRegistery.has(email)) {
      return this.recipientsRegistery.get(email) as ChatRecipient;
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

  loadMessages = async (id: string) => {
    if (this.messagesRegistery.has(id)) {
      return;
    }

    const messagesSnapshot = await db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();

    const messages = messagesSnapshot.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as ChatMessage;
      })
      .map((message) => ({
        ...message,
        timestamp: message.timestamp.toDate().getTime(),
      }));

    this.messagesRegistery.set(id, messages);
  };

  selectChat = async (id: string) => {
    if (this.chatsRegistery.has(id)) {
      this.selectedChat = this.chatsRegistery.get(id) as Chat;
      return this.selectedChat;
    }

    const chatSnapshot = await db.collection("chats").doc(id).get();

    const chat = {
      id: chatSnapshot.id,
      ...chatSnapshot.data(),
    } as Chat;

    runInAction(() => {
      this.chatsRegistery.set(id, chat);
      this.selectedChat = chat;
    });

    return chat;
  };

  selectRecipient = async (users: string[]) => {
    const email = this.getRecipientEmail(users);
    const recipient = await this.loadRecipient(email);

    runInAction(() => {
      this.selectedRecipient = recipient;
    });
  };

  setChatsQuery = (
    chatsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> | null
  ) => {
    this.chatsQuery = chatsQuery;
  };
}

export default ChatStore;
