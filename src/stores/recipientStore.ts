import { db } from "config/firebase";
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

  getRecipientEmail = (users: string[]) => {
    return users?.find((user) => user !== store.userStore.user?.email) || "";
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
        lastSeen: userDoc.data().lastSeen?.toDate(),
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
