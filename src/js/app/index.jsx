import { h } from "preact";
import { connect } from "preact-redux";

import Loader from "./Loader";

const App = ({ status }) => {
  switch (status) {
    case "LOADING":
      return <Loader size={80} />;
    case "LOADED":
      return <div>Hello</div>;
  }
};

const mapStateToProps = state => ({
  status: state.status
});

export default connect(mapStateToProps)(App);
