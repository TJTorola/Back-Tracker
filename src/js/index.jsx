import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Bart from "~/api/bart";
import App from "~/app";
import createStore from "~/store";
import { initialize } from "~/store/actions";

export const main = () => {
  const store = createStore();
  store.dispatch(initialize());

  // Dev helpers
  window.Bart = Bart;
  window.store = createStore();

  // Mount the application into #app
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
};
