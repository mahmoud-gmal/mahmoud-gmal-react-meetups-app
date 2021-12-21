// import { useHistory } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavouitesContext = createContext();

export const useFavouites = () => {
  return useContext(FavouitesContext);
};

export const FavouritesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [favourites, setFavourites] = useState([]);
  // const [favStatus, setFavStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Storing all favourite meetups
  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("meetups")
        .where("isFavourite", "==", true)
        .onSnapshot((snapshot) => {
          const favMeetupsdoc = [];
          snapshot.docs.map((doc) => {
            favMeetupsdoc.push({ id: doc.id, ...doc.data() });
          });
          setFavourites(favMeetupsdoc);
          setLoading(false);
        });
    }
  }, []);

  // Toggle  MEETUP TO FAVOURITE LIST
  const toggleFavourite = (id) => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("meetups")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref.update({ isFavourite: !doc.data().isFavourite })
          // if (doc.data().isFavourite === true) {
          //   doc.ref.update({ isFavourite: false });
          // alert('has added to fav list')
          //   setFavStatus(false);
          // } else {
          //   doc.ref.update({ isFavourite: true });
          //   setFavStatus(true);
          // }
        }

      });
  };



  const value = {
    toggleFavourite,
    favourites,
  };

  return (
    <FavouitesContext.Provider value={value}>
      {children}
    </FavouitesContext.Provider>
  );
};
