import { db } from "config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatRecipient } from "types/chat";
import { store } from "./store";

class RecipientStore {
  recipientsRegistery = new Map<string, ChatRecipient>();
  selectedRecipient: ChatRecipient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.recipientsRegistery.clear();
    this.selectedRecipient = null;
  };

  getRecipientEmail = (users: string[]) =>
    users?.find((user) => user !== store.userStore.user?.email) || "";

  loadRecipient = async (email: string) => {
    if (this.recipientsRegistery.has(email)) {
      return this.recipientsRegistery.get(email) as ChatRecipient;
    }

    let user: ChatRecipient;

    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const userSnapshot = await getDocs(usersQuery);

    const userDoc = userSnapshot?.docs?.[0];

    if (userDoc) {
      user = {
        email: userDoc.data().email,
        photoURL: userDoc.data().photoURL,
        lastSeen: new Date(userDoc.data().lastSeen?.toDate()),
      } as ChatRecipient;
    } else {
      user = { email };
    }

    this.recipientsRegistery.set(user.email, user);

    return user;
  };

  selectRecipient = async (users: string[]) => {
    const email = this.getRecipientEmail(users);
    const recipient = await this.loadRecipient(email);

    runInAction(() => {
      this.selectedRecipient = recipient;
    });
  };
}

export default RecipientStore;
