import { auth, db } from "config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutAuth,
  User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { makeAutoObservable, reaction } from "mobx";
import { toast } from "react-toastify";
import { User } from "types/user";
import { resetStore, store } from "./store";

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

        const chatsQuery = query(
          collection(db, "chats"),
          where("users", "array-contains", user.email),
          orderBy("lastActive", "desc"),
          limit(store.chatStore.chatsLimit)
        );

        store.chatStore.setChatsQuery(chatsQuery);
      }
    );
  }

  reset = () => {
    this.user = null;
    this.loading = true;
  };

  signIn = () => {
    this.loading = true;

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user }) => {
        if (user) {
          this.setUser(user);

          setDoc(
            doc(db, "users", user.uid),
            {
              email: user.email,
              photoURL: user.photoURL,
              lastSeen: serverTimestamp(),
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
    if (this.user) {
      signOutAuth(auth);
      resetStore();
    }
  };

  updateLastSeen = () => {
    if (!this.user) {
      return false;
    }

    setDoc(
      doc(db, "users", this.user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  };

  setUser = (user: FirebaseUser | null) => {
    if (user) {
      this.user = {
        uid: user.uid,
        email: user.email!,
        photoURL: user.photoURL!,
      };
    } else {
      this.user = null;
    }

    this.loading = false;
  };
}

export default UserStore;
