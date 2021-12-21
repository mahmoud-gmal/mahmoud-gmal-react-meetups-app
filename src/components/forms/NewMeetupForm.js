import { useRef } from "react";
import { useMeetups } from "../../context/MeetupsContext";
import Card from "../ui/Card";
import classes from "./Forms.module.css";
import { CircleToBlockLoading } from "react-loadingg";
const NewMeetupForm = () => {
const { addNewMeetup, loading } = useMeetups();





  // init useRef
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await addNewMeetup(
        titleInputRef.current.value,
        imageInputRef.current.files[0],
        addressInputRef.current.value,
        descriptionInputRef.current.value
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}
      style={{
        opacity: loading && '.5',
        pointerEvents: loading && 'none'
      }}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="file"
            required
            id="image"
            accept=".png, .jpg, jpeg"
            ref={imageInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Add Meetup</button>
        </div>
      </form>

      {loading && <CircleToBlockLoading color="#77002e" size="large" />}
    </Card>
  );
};

export default NewMeetupForm;
