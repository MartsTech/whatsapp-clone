import { db } from "config/firebase";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import validateEmail from "utils/validateEmail";
import { store } from "./store";

class ChatStore {
  constructor() {
    makeAutoObservable(this);
  }

  createChat = () => {
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

    if (this.chatExists(user.email, input)) {
      toast.error("Chat already exists.");
      return;
    }

    db.collection("chats").add({
      users: [user.email, input],
    });
  };

  private chatExists = (userEmail: string, recipientEmail: string) => {
    const exists = !!db
      .collection("chats")
      .where("users", "array-contains", userEmail)
      .onSnapshot((snapshot) => {
        snapshot.docs.find(
          (chat) =>
            chat.data().users.find((user: string) => user === recipientEmail)
              ?.length > 0
        );
      });

    return exists;
  };
}

export default ChatStore;
