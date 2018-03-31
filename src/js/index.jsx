import React from "react";
import ReactDOM from "react-dom";

import Bart from "~/api/bart";
import App from "~/app";

export const main = () => {
  // Mount the application into #app
  window.Bart = Bart;
  ReactDOM.render(<App />, document.getElementById("app"));
};
