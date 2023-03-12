import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { IAuthProvider, IAuthContext, IAuthState, SignIn } from "./types";
import { auth } from "./firebase/firebase";
import { signInAnonymously } from "firebase/auth";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "src/routes/router";

const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ queryClient }: IAuthProvider) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    username: null,
    type: null,
  });

  // useEffect(() => {
  // queryClient.setQueryDefaults(["auth"], {
  //   queryFn: () => {
  //     return queryClient.getQueryData(["auth"]) || null;
  //   },
  //   staleTime: 0,
  //   retry: 1,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });
  // }, [authState]);

  const signIn: SignIn = (token, username, type = "user") => {
    setAuthState({ token, username, type });
    // queryClient.setQueryData(["auth"], { token, username, type });
    // queryClient.invalidateQueries(["auth"]);
  };

  const anonSignIn = () => {
    signInAnonymously(auth).then(({ user }) => {
      user.getIdToken().then((token) => {
        // queryClient.setQueryData(["auth"], {
        //   token,
        //   username: null,
        //   type: "anon",
        // });
        // queryClient.invalidateQueries(["auth"]);

        setAuthState({ token, username: null, type: "anon" });
      });
    });
  };

  const signOut = useCallback(() => {
    auth.signOut().then(() => {
      anonSignIn();
    });
  }, [auth]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user && !user.isAnonymous) {
        console.log(user.uid);
        user.getIdToken().then((token) => {
          setAuthState({ token, username: user.displayName, type: "user" });
          // queryClient.setQueryData(["auth"], {
          //   token,
          //   username: user.displayName,
          //   type: "user",
          // });
          // queryClient.invalidateQueries(["auth"]);
        });
      } else {
        anonSignIn();
      }

      return unsub;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      authState,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <RouterProvider router={router} context={authState} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
