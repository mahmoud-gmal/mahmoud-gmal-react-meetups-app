// import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/forms/NewMeetupForm';

function NewMeetupPage() {
  // const history = useHistory();



  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm/>
    </section>
  );
}

export default NewMeetupPage;
