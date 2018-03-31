import React from "react";
import { connect } from "react-redux";

const App = ({ state }) => <pre>{JSON.stringify(state, null, 2)}</pre>;

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(App);
