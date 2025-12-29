import React, { createContext, useEffect, useMemo, useState } from "react";
import type { User } from "@firebase/auth";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "@firebase/auth";
import { firebaseAuth } from "@/services/firebase/firebase";

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
  error: string | null;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;

  updateDisplayName: (displayName: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  initializing: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateDisplayName: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
  };

  const signUp = async (email: string, password: string) => {
    setError(null);
    await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
  };

  const signOut = async () => {
    setError(null);
    await firebaseSignOut(firebaseAuth);
  };

  const updateDisplayName = async (displayName: string) => {
    setError(null);
    const current = firebaseAuth.currentUser;
    if (!current) throw new Error("No user is signed in.");
    await updateProfile(current, { displayName: displayName.trim() });
    setUser(firebaseAuth.currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      error,
      signIn,
      signUp,
      signOut,
      updateDisplayName,
    }),
    [user, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
