import {useContext, createContext, useEffect, useState} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {app} from "../firebase-config";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const auth = getAuth(app);

  const [user, setUser] = useState({});

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{googleSignIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
