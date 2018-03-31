import React from "react";
import ReactDOM from "react-dom";

import App from "~/app";

export const main = () => {
  // Mount the application into #app
  ReactDOM.render(<App />, document.getElementById("app"));
};
