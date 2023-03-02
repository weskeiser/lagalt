import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IAuthProvider, IAuthContext, IAuthState } from "./types";
import { auth } from "./firebase";
import { createFirebaseUserCB, signInCB } from "./firebase/helpers";
import { queryClient } from "..";

const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    username: null,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user)
        user.getIdToken().then((token) => {
          setAuthState({ token, username: user.displayName || "" });
        });

      return unsub;
    });
  }, []);

  const signIn = useMemo(() => signInCB(auth, setAuthState), [auth]);

  const createFirebaseUser = useMemo(
    () => createFirebaseUserCB(auth, setAuthState),
    [auth]
  );

  const signOut = useCallback(() => {
    auth.signOut();
    setAuthState({ token: null, username: null });
  }, [auth]);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      createFirebaseUser,
      authState,
    }),
    [authState]
  );

  return <AuthContext.Provider value={contextValue} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
