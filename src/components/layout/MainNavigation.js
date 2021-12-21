// import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { useFavouites } from "./../../context/favoritesContext";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { currentUser, logout, displayName } = useAuth();
  const { favourites } = useFavouites();
  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          {currentUser !== null && (
            <>
              <li>
                <NavLink to="/" exact={true} activeClassName={classes.active}>
                  All Meetups
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-meetup" activeClassName={classes.active}>
                  Add New Meetup
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" activeClassName={classes.active}>
                  My Favorites
                  <span className={classes.badge}>{favourites.length}</span>
                </NavLink>
              </li>
            </>
          )}

          {currentUser !== null ? (
            <>
              <li className={classes.user_bt}>
                {" "}
                {currentUser.displayName
                  ? currentUser.displayName
                  : displayName}
              </li>
              <li>
                <button className={classes.btn_logout} onClick={logoutHandler}>
                  logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
