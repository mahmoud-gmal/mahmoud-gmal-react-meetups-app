
import SignupForm from "../components/forms/SignupForm";
import { ToastContainer } from "react-toastify";
function SignupPage() {
 
  return (
    <section className="signup-page">
      <h1>Signup</h1>
      <SignupForm />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </section>
  );
}

export default SignupPage;
