import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter,Router } from "react-router-dom";
import { store } from './app/store/actions/store';
import { Provider } from "react-redux";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
  <Provider store={store}>
    <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
