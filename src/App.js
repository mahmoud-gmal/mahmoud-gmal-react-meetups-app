import { Route, Switch } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgetPasswordPage from "./pages/ForgetPassword";
import { AuthProvider } from "./context/AuthContext";
import { MeetupsProvider } from "./context/MeetupsContext";
import { FavouritesProvider } from "./context/favoritesContext";
import PrivateRoute from "./components/PrivateRoute";
import EditMeetupPage from "./pages/EditMeetup";
import { ToastContainer } from "react-toastify";
import { NoMatchPage } from "./components/NoMatchPage";
// toast
// meetup?edit=
function App() {
  return (
    <AuthProvider>
      <MeetupsProvider>
        <FavouritesProvider>
          <Layout>
            <Switch>
              <PrivateRoute exact path="/" component={AllMeetupsPage} />
              <PrivateRoute path="/new-meetup" component={NewMeetupPage} />
              <PrivateRoute
                path="/edit-meetup/:id"
                component={EditMeetupPage}
              />
              <PrivateRoute path="/favorites" component={FavoritesPage} />
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/forget-password">
                <ForgetPasswordPage />
              </Route>
              <Route component={NoMatchPage} />
            </Switch>
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
          </Layout>
        </FavouritesProvider>
      </MeetupsProvider>
    </AuthProvider>
  );
}

export default App;
