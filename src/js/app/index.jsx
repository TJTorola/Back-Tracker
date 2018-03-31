import { h } from "preact";
import { connect } from "preact-redux";

const App = ({ state }) => <pre>{JSON.stringify(state, null, 2)}</pre>;

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(App);
