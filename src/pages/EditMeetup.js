// import { useHistory } from 'react-router-dom';

import EditMeetupForm from "../components/forms/EditMeetupForm";

function EditMeetupPage() {
  // const history = useHistory();

  return (
    <section>
      <h1>Edit New Meetup</h1>
      <EditMeetupForm/>
    </section>
  );
}

export default EditMeetupPage;
