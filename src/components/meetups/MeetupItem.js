import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useMeetups } from "../../context/MeetupsContext";
import { useFavouites } from "../../context/favoritesContext";
import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

function MeetupItem(props) {
  const { deleteMeetup } = useMeetups();
  const { toggleFavourite } = useFavouites();

// console.log(props);
  const onAddMeetupToFavourites = (id) => {
    toggleFavourite(id);
  };

  const onDeleteMeetup = async (id, imgURL) => {
    try {
      await deleteMeetup(id, imgURL);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <li className={classes.item}>
      {props.title && (
        <Card>
          <div className={classes.image}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes.content}>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
          </div>
          <div className={classes.actions}>
            <button onClick={() => onAddMeetupToFavourites(props.id)}>
              {props.isFavourite === true
                ? "Remove From Favourites"
                : " Add To Favorites"}
            </button>
            <Link className={classes.edit_btn} to={`/edit-meetup/${props.id}`}>
              Edit this
            </Link>
            {/* <button className={classes.edit_btn}>Edit this</button> */}
            <button
              className={classes.delete_btn}
              onClick={() => onDeleteMeetup(props.id, props.image)}
            >
              Delete
            </button>
          </div>
        </Card>
      )}
    </li>
  );
}

export default MeetupItem;
