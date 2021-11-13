import React, { Fragment, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Container, Modal } from "semantic-ui-react";
import NavBar from "./NavBar";
import BooksDashboard from "../../features/books/dashboard/BooksDashboard";
import HomePage from '../../features/books/form/HomePage';
import BooksForm from "./../../features/books/form/BooksForm";
import BooksDetails from "./../../features/books/details/BooksDetails";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import UserLoginForm from "../../features/users/UserLoginForm";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../app/store/actions/userAction';
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  var token: string | null;
  token = useSelector((state: any) => state.userReducer.token);
  
  useEffect(() => {
    dispatch(actions.GetUser());
  }, [dispatch])


  return (
    <>
      <ToastContainer position='top-center' hideProgressBar/>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/books" component={BooksDashboard} />
                <Route exact path="/books/:id" component={BooksDetails} />
                <Route
                  path={["/createBook", "/bookedit/:id"]}
                  render={(props) => (
                    <BooksForm {...props} key={location.key || "empty"} />
                  )}
                />
                {/* <Route path={['/createBook','/manage/:id']} component={BooksForm} /> */}
                {/* <Redirect from="createbook" to="/books" /> */}
                {/* <Route path="/login" component={UserLoginForm} /> */}
                <Route component={NotFound}/>
              </Switch>
              
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
