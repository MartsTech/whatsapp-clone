import { createContext, useContext } from "react";
import ChatStore from "./chatStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  chatStore: ChatStore;
}

export const store: Store = {
  userStore: new UserStore(),
  chatStore: new ChatStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
