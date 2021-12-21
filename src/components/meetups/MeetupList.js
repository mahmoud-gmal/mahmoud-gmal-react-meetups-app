import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups &&
        meetups.map((meetup, index) => (
          <MeetupItem
            key={index}
            id={meetup.doc_id}
            address={meetup.address}
            image={meetup.image}
            title={meetup.title}
            description={meetup.description}
            isFavourite={meetup.isFavourite}
          ></MeetupItem>
        ))}
    </ul>
  );
}

export default MeetupList;
