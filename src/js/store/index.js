import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import reducer from "./reducer";

export default (initState = {}) =>
  createStore(reducer, initState, applyMiddleware(logger));
