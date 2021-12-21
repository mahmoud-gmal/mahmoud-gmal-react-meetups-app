import { useFavouites } from "./../context/favoritesContext";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MeetupList from "../components/meetups/MeetupList";
import { Link } from "react-router-dom";
import { DiamonLoading } from "react-loadingg";
function FavoritesPage() {
  const { currentUser } = useAuth();
  const { favourites } = useFavouites();
  const [favMeetups, setFavMeetups] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("meetups")
      .where("isFavourite", "==", true)
      .onSnapshot((snapshot) => {
        const meetupsdoc = [];
        snapshot.docs.map((doc) => {
          meetupsdoc.push({ doc_id: doc.id, ...doc.data() });
        });
        // console.log(meetupsdoc);
        setFavMeetups(meetupsdoc);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      });
  }, []);

  if (loading) {
    return <DiamonLoading color="#77002e" size="large" speed=".4" />;
  }

  let content;

  if (favourites.length === 0) {
    content = (
      <p>
        You got no favourite meetups yet. Start adding some?
        <Link to="/">Add favourite Meetup</Link>
      </p>
    );
  } else {
    content = <MeetupList meetups={favMeetups} />;
  }
  // MeetupList
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
