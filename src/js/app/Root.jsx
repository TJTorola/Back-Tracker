import { h } from "preact";
import { connect } from "preact-redux";

import { setFromStation, setToStation } from "~/store/actions";

const Root = ({
  fromStation,
  setFromStation,
  setToStation,
  stations,
  toStation
}) => (
  <nav>
    <label>From:</label>
    <select value={fromStation} onChange={setFromStation}>
      {stations.map(s => (
        <option key={s.name} value={s.abbreviation}>
          {s.name}
        </option>
      ))}
    </select>

    <label>To:</label>
    <select value={toStation} onChange={setToStation}>
      {stations.map(s => (
        <option key={s.name} value={s.abbreviation}>
          {s.name}
        </option>
      ))}
    </select>
  </nav>
);

const mapStateToProps = state => ({
  fromStation: state.fromStation,
  stations: state.stations,
  toStation: state.toStation
});

const mapDispatchToProps = dispatch => ({
  setFromStation: e => dispatch(setFromStation(e.target.value)),
  setToStation: e => dispatch(setToStation(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
