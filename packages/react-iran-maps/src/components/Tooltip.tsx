import { Tooltip as ReactTooltip } from "react-tooltip";

export function Tooltip() {
  return (
    <ReactTooltip
      id="tooltip"
      style={{
        zIndex: 1000,
        color: "black",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "12px",
      }}
      data-tooltip-float={true}
      float={true}
    />
  );
}
