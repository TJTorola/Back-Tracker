import { h } from "preact";
import { connect } from "preact-redux";

import Swap from "~/components/swap";
import { setStations, swapStations } from "~/store/actions";

const Root = ({
  fromStation,
  setFromStation,
  setToStation,
  stations,
  toStation,
  swapStations
}) => (
  <nav>
    <div class="selects">
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
    </div>
    <button onClick={swapStations}>
      <Swap height={30} />
    </button>
  </nav>
);

const mapStateToProps = state => ({
  fromStation: state.fromStation,
  stations: state.stations,
  toStation: state.toStation
});

const mapDispatchToProps = dispatch => ({
  swapStations: () => dispatch(swapStations()),
  setFromStation: e => dispatch(setStations({ from: e.target.value })),
  setToStation: e => dispatch(setStations({ to: e.target.value }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
