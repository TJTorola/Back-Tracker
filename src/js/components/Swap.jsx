import { h } from "preact";

const Swap = ({ height = 44, color = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    fill={color}
    viewBox="0 0 640 512"
  >
    <path
      d="M388.5 387.5A12 12 0 0 1 380 408H128a24 24 0 0 1-24-24V171.2H31.8a12
      12 0 0 1-8.4-20.5l96.1-96.2a12 12 0 0 1 17 0l96.1 96.2a12 12 0 0 1-8.4
      20.5H152V360h204a12 12 0 0 1 8.5 3.5l24 24zm219.7-46.7H536V128a24 24 0 0
      0-24-24H260a12 12 0 0 0-8.5 20.5l24 24a12 12 0 0 0 8.5 3.5h204v188.8h-72.2a12
      12 0 0 0-8.4 20.5l96.1 96.2a12 12 0 0 0 17 0l96.1-96.2a12 12 0 0 0-8.4-20.5z"
    />
  </svg>
);

export default Swap;
