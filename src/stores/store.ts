import { createContext, useContext } from "react";
import ChatStore from "./chatStore";
import MessageStore from "./messageStore";
import RecipientStore from "./recipientStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  chatStore: ChatStore;
  recipientStore: RecipientStore;
  messageStore: MessageStore;
}

export const store: Store = {
  userStore: new UserStore(),
  chatStore: new ChatStore(),
  recipientStore: new RecipientStore(),
  messageStore: new MessageStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
