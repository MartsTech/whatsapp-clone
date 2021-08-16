import { auth, provider } from "config/firebase";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { User } from "types/user";

class UserStore {
  user: User | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User | null) => {
    this.user = user;
    this.loading = false;
  };

  signIn = () => {
    this.loading = true;

    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          this.user = {
            email: user.email!,
            displayName: user.displayName!,
            photoURL: user.photoURL!,
          };
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
  };
}

export default UserStore;
