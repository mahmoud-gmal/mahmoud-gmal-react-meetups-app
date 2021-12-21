import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMeetups } from "../../context/MeetupsContext";
import { db } from "../../firebase";
import Card from "../ui/Card";
import { useHistory, useParams } from "react-router-dom";
import classes from "./Forms.module.css";
import { CircleToBlockLoading } from "react-loadingg";
const EditMeetupForm = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { editMeetup, loading } = useMeetups();
  const [meetup, setMeetup] = useState([]);
  const { id } = useParams();

  // get current meetup data to edit it
  useEffect(() => {
    let isSubscribed = true;
    db.collection("users")
      .doc(currentUser.uid)
      .collection("meetups")
      .doc(id)
      .onSnapshot((snap) => {
        if (isSubscribed & snap.exists) {
          setMeetup(snap.data());
        } else {
          history.replace("/");
        }
      });
    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, []);

  // init useRef
  const titleInputRef = useRef();
  const eleRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const previewMainImages = () => {
    if (imageInputRef.current.value !== "") {
      const uploadedImg = URL.createObjectURL(imageInputRef.current.files[0]);
      eleRef.current.style.backgroundImage = `url(${uploadedImg})`;
    } else {
      eleRef.current.style.backgroundImage = `url(${meetup.image})`;
      // imageInputRef.current.files = `url(${meetup.image})`;
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();

    try {
      editMeetup(
        titleInputRef.current.value,
        imageInputRef.current.files[0],
        addressInputRef.current.value,
        descriptionInputRef.current.value,
        meetup.image,
        id
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitHandler}
        style={{
          opacity: loading && ".5",
          pointerEvents: loading && "none",
        }}
      >
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            defaultValue={meetup.title}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="file"
            accept=".png, .jpg, jpeg"
            id="imageUpload"
            onChange={previewMainImages}
            // multiple
            ref={imageInputRef}
          />
          <div className="avatar-preview">
            <div
              ref={eleRef}
              className={classes.avatar_preview}
              style={{ backgroundImage: `url(${meetup.image})` }}
            ></div>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            ref={addressInputRef}
            defaultValue={meetup.address}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
            defaultValue={meetup.description}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Edit Meetup</button>
          <button
            type="button"
            className={classes.btn_back}
            onClick={() => history.push("/")}
          >
            Back
          </button>
        </div>
      </form>
      {loading && <CircleToBlockLoading color="#77002e" size="large" />}
    </Card>
  );
};

export default EditMeetupForm;
