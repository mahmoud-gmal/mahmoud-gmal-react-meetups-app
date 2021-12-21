import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
// import { useMeetups } from "../context/MeetupsContext";
import MeetupList from "../components/meetups/MeetupList";
import { Link } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";

function AllMeetupsPage() {
  const { currentUser } = useAuth();

  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("meetups")
      .onSnapshot((snapshot) => {
        const meetupsdoc = [];
        snapshot.docs.map((doc) => {
          meetupsdoc.push({ doc_id: doc.id, ...doc.data() });
        });
        // console.log(meetupsdoc);
        setMeetups(meetupsdoc);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      });
  }, []);

  if (loading) {
    return <LoopCircleLoading color="#77002e" size="large" />;
  }

  if (meetups.length === 0) {
    return (
      <section>
        <h1>All Meetups</h1>
        <p>
          You got no meetups yet. Start adding some?{" "}
          <Link to="/new-meetup">Add New Meetup</Link>
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={meetups} />
    </section>
  );
}

export default AllMeetupsPage;
