import { h } from "preact";
import { connect } from "preact-redux";

import Loader from "~/components/Loader";

import Root from "./Root";

const Switch = ({ status }) => {
  switch (status) {
    case "LOADING":
      return <Loader size={80} />;
    case "LOADED":
      return <Root />;
  }
};

const mapStateToProps = state => ({
  status: state.status
});

export default connect(mapStateToProps)(Switch);
