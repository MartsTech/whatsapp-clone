import { db } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  FieldValue,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  QuerySnapshot,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Chat } from "types/chat";
import validateEmail from "utils/validateEmail";
import { store } from "./store";

class ChatStore {
  chatsRegistery = new Map<string, Chat>();
  selectedChat: Chat | null = null;
  chatsLimit = 9;
  hasMore = false;
  lastChatTimestamp: FieldValue | null = null;
  chatsQuery: Query<DocumentData> | null = null;
  unsubscribeChatsSnapshot?: () => void;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.chatsQuery,
      async (chatsQuery) => {
        if (chatsQuery) {
          this.unsubscribeChatsSnapshot = onSnapshot(chatsQuery, (snapshot) => {
            this.setChatsFromSnapshot(snapshot);
          });
        }
      }
    );
  }

  reset = () => {
    this.chatsRegistery.clear();
    this.selectedChat = null;
    this.chatsLimit = 9;
    this.hasMore = false;
    this.lastChatTimestamp = null;
    this.chatsQuery = null;

    if (this.unsubscribeChatsSnapshot) {
      this.unsubscribeChatsSnapshot();
      this.unsubscribeChatsSnapshot = undefined;
    }
  };

  get chats() {
    return Array.from(this.chatsRegistery.values()).sort(
      (a, b) => b.lastActive?.getTime() - a.lastActive?.getTime()
    );
  }

  loadMore = async () => {
    const { user } = store.userStore;

    if (!this.chatsQuery || !user) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    const newChatsQuery = query(
      collection(db, "chats"),
      where("users", "array-contains", user.email),
      orderBy("lastActive", "desc"),
      startAfter(this.lastChatTimestamp),
      limit(store.chatStore.chatsLimit)
    );

    const chatsSnapshot = await getDocs(newChatsQuery);
    this.setChatsFromSnapshot(chatsSnapshot);
  };

  private setChatsFromSnapshot = (
    chatsSnapshot: QuerySnapshot<DocumentData>
  ) => {
    if (chatsSnapshot.size < this.chatsLimit) {
      this.hasMore = false;
    } else {
      this.hasMore = true;
    }

    chatsSnapshot?.docs?.forEach((doc) => {
      if (!this.chatsRegistery.has(doc.id)) {
        this.lastChatTimestamp = doc.data().lastActive;
      }

      const chat = {
        id: doc.id,
        users: doc.data().users,
        lastActive: new Date(doc.data().lastActive?.toDate()),
        unseenMessages: doc.data().unseenMessages,
      } as Chat;

      this.chatsRegistery.set(chat.id, chat);
    });
  };

  selectChat = async (id: string) => {
    if (this.chatsRegistery.has(id)) {
      this.selectedChat = this.chatsRegistery.get(id) as Chat;
      return this.selectedChat;
    }

    const chatRef = doc(db, "chats", id);
    const chatSnapshot = await getDoc(chatRef);

    if (!chatSnapshot.exists) {
      this.selectedChat = null;
      return null;
    }

    const chat = {
      id: chatSnapshot.id,
      users: chatSnapshot.data()?.users,
      lastActive: new Date(chatSnapshot.data()?.lastActive?.toDate()),
      unseenMessages: chatSnapshot.data()?.unseenMessages,
    } as Chat;

    runInAction(() => {
      this.chatsRegistery.set(id, chat);
      this.selectedChat = chat;
    });

    return chat;
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

    const chatExists = await this.chatExists(input);

    if (chatExists) {
      toast.error("Chat already exists.");
      return;
    }

    await addDoc(collection(db, "chats"), {
      users: [user.email, input],
      lastActive: serverTimestamp(),
    });
  };

  private chatExists = async (recipientEmail: string) => {
    const exists = !!this.chats.find((chat) =>
      chat.users.includes(recipientEmail)
    );

    if (exists) {
      return true;
    }

    if (!this.chatsQuery) {
      toast.error("An error occurred. Please try again.");
      return true;
    }

    const chatsQuery = query(
      collection(db, "chats"),
      where("users", "array-contains", recipientEmail)
    );

    const chatsSnapshot = await getDocs(chatsQuery);

    if (!chatsSnapshot.empty) {
      return true;
    }

    return false;
  };

  validateChat = async (id: string) => {
    if (this.chatsRegistery.has(id)) {
      return true;
    }

    const chatRef = doc(db, "chats", id);
    const chatSnapshot = await getDoc(chatRef);

    if (chatSnapshot.exists()) {
      return true;
    }

    return false;
  };

  setChatsQuery = (chatsQuery: Query<DocumentData> | null) => {
    this.chatsQuery = chatsQuery;
  };
}

export default ChatStore;
