import { useHistory } from "react-router-dom";
import ForgetPasswordForm from "../components/forms/ForgetPasswordForm";

function ForgetPasswordPage() {
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    fetch(
      "https://react-getting-started-48dec-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
    });
  }

  return (
    <section className="login-page">
      <h1>ForgetPassword </h1>
      <ForgetPasswordForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default ForgetPasswordPage;
