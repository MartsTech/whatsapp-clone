import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import validateEmail from "utils/validateEmail";

class ChatStore {
  constructor() {
    makeAutoObservable(this);
  }

  createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) {
      toast.error("No email provided");
      return;
    }

    if (!validateEmail(input)) {
      toast.error("Invalid Email");
      return;
    }

    //
  };
}

export default ChatStore;
