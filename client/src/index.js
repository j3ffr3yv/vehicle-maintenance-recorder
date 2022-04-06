import React from 'react';
import ReactDOM  from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import "react-table";
import store from "./store";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);