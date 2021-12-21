import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./Forms.module.css";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
const ForgetPasswordForm = () => {
  const { resetPassword } = useAuth();

  const emailInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await resetPassword(emailInputRef.current.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.actions}>
          <p className={classes.error}></p>
        </div>
        <div className={classes.actions}>
          <button type="submit">Reset password</button>
        </div>
        <div className={classes.actions}>
          Need an account? <Link to="/Signup">Sign Up</Link>
        </div>
      </form>
    </Card>
  );
};

export default ForgetPasswordForm;
