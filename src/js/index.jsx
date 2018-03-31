// POLYFILLS
import "regenerator-runtime/runtime";

import { render, h } from "preact";
import { Provider } from "preact-redux";

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
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
};
