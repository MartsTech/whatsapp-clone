import { auth, db, provider } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { User } from "types/user";
import { store } from "./store";

class UserStore {
  user: User | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.user,
      (user) => {
        if (!user || store.chatStore.chatsQuery) {
          return;
        }

        const chatsQuery = db
          .collection("chats")
          .where("users", "array-contains", user.email);

        store.chatStore.setChatsQuery(chatsQuery);
      }
    );
  }

  signIn = () => {
    this.loading = true;

    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          runInAction(() => {
            this.user = {
              uid: user.uid,
              email: user.email!,
              photoURL: user.photoURL!,
            };
          });

          db.collection("users").doc(user.uid).set(
            {
              email: user.email,
              photoURL: user.photoURL,
              lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });

    this.loading = false;
  };

  signOut = () => {
    auth.signOut();
    this.user = null;
    store.chatStore.setChatsQuery(null);
    store.chatStore.chatsRegistery.clear();
    store.recipientStore.recipientsRegistery.clear();
    store.messageStore.messagesRegistery.clear();
  };

  updateLastSeen = () => {
    if (!this.user) {
      return false;
    }

    db.collection("users").doc(this.user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  };

  setUser = (user: User | null) => {
    this.user = user;
    this.loading = false;
  };
}

export default UserStore;
