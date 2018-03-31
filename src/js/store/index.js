import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducer";

export default (initState = {}) =>
  createStore(reducer, initState, applyMiddleware(thunk, logger));
