import { useRef } from "react";
import { useAuth } from "./../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./Forms.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const { login } = useAuth();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
      await login(enteredEmail, enteredPassword);
      history.push("/");
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
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" required id="password" ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <p className={classes.error}></p>
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <button type="button" className={classes.btn_link}>
            <Link to="/Signup">Signup</Link>
          </button>
        </div>
        <div className={classes.actions}>
          <Link to="/forget-password">Forgot Password?</Link>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
