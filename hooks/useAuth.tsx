"use client";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useLocalStorage } from "./useLocalStorage";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname  = usePathname();
  const [user, setUser] = useLocalStorage("user", "");

  // call this function when you want to authenticate the user
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const userId: any = user.uid;
        setUser(userId);

        const isRecorded = localStorage.getItem("isRecorded");

        if (isRecorded) {
          addUserIdToRecord(user.uid, isRecorded, () => {});
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          toast("Incorrect email or password", { type: "error" });
        }
        console.log(errorCode);
      });
  };

  const addUserIdToRecord = async (
    userID: string,
    recordUUID: string,
    navigate: (path: string) => any
  ) => {
    return fetch(
      "https://ixmem9ssq8.execute-api.ap-southeast-2.amazonaws.com/Prod/addusertorecord",
      {
        method: "POST",
        headers: {
          "Conten-Type": "application/json",
          userID: userID,
          recordUUID: recordUUID,
        },
      }
    )
      .then((data) => {
        console.log(data);
        navigate("/sharing");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        return fetch(
          "https://ixmem9ssq8.execute-api.ap-southeast-2.amazonaws.com/Prod/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.uid }),
          }
        )
          .then(() => {})
          .catch((e) => {
            console.log(e);
            toast(`Something went wrong: ${e}`, { type: "error" });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          toast("Email already in use", { type: "error" });
        } else if (errorCode === "auth/weak-password") {
          toast("Password is weak", { type: "error" });
        }
        console.log(errorCode);
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log("user: ", user);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      signInWithGoogle,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  console.log("user: ", user);

  
  useEffect(() => {
    if(!pathname.includes("/record/")){

      if (user ) {
        router.push("/record");
      } else {
        router.push("/sign-in");
      }

    }
  }, [user,pathname]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
