import { h } from "preact";
import { connect } from "preact-redux";

import Loader from "./Loader";

const App = ({ status }) => (
  <div>
    <Loader />
  </div>
);

const mapStateToProps = state => ({
  status: state.status
});

export default connect(mapStateToProps)(App);
