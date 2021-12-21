import { useRef } from "react";
import { useAuth } from "./../../context/AuthContext";
import Card from "../ui/Card";
import classes from "./Forms.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const { signup } = useAuth();


  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

    try {
      if (enteredPassword !== enteredPasswordConfirm) {
        throw new Error("password and confirm password field is not equal!");
      } else {
        await signup(enteredName, enteredEmail, enteredPassword);
      }
    } catch (e) {
      toast.error(e.message, {});
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password-confirm">Password Confirmation</label>
          <input
            type="password"
            required
            id="password-confirm"
            ref={passwordConfirmInputRef}
          />
        </div>
        <div className={classes.actions}>
          {/* <p className={classes.error}> {error}</p> */}
        </div>
        <div className={classes.actions}>
          <button type="submit">Sign Up</button>
          <button type="button" className={classes.btn_link}>
            <Link to="/login">Login</Link>
          </button>

          {/* <button type="button">{currentUser && <p>success signup</p>}</button> */}
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;
