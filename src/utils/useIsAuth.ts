import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export const useIsAuth = () => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/login");
    }

    if (user && router.pathname == "/login") {
      router.replace("/");
    }
  }, [user, loading, router]);
};
