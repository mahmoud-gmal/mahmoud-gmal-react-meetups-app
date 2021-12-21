import { useHistory } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

// 'custom hook' we access our context through this arrow function
// EX: import { useAuth } from "../contexts/AuthContext"; => const { currentUser, logout } = useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};

// We provide our context with value
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // credentials
  const signup = (name, email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        cred.user
          .updateProfile({
            displayName: name,
          })
          .then(
            () => {
              // displayName has been updated successfully .
              setDisplayName(name);
            },
            (error) => {
              //displayName hasn't been updated successfully. An error happened.
              console.log(error);
            }
          );
      })
      .then(() => {
        toast.success(
          `Welcome ${name}, You successfully created an account.`,
          {}
        );
        // redirect after 3 second
        window.setTimeout(() => {
          history.push("/");
        }, 4000);
      })
      .catch((error) => toast.error(error.message, {}));
  };

  const login = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => toast.error(error.message, {}));
    // .catch((error) => alert(error.message))
  };

  const logout = () => {
    auth.signOut();
    setDisplayName("");
  };
  const resetPassword = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        history.push("/login");
        toast.success(
          `Password Reseting link has been sent to your email ${email}!`,
          {}
        );
      })
      .catch((error) => toast.error(error.message, {}));
  };

  // Cleanup subscription on unmount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // console.log(user ? user.displayName : null);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    displayName,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
