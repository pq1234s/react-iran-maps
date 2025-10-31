import { Tooltip as ReactTooltip } from "react-tooltip";

export function Tooltip() {
  return (
    <ReactTooltip
      id="tooltip"
      border="1px solid #e0e0e0"
      noArrow
      style={{
        zIndex: 1000,
        color: "black",
        backgroundColor: "white",
        minWidth: "60px",
        borderRadius: "6px",
        padding: "12px",
        textAlign: "right",
        direction: "ltr",
      }}
      data-tooltip-float={true}
      float={true}
    />
  );
}
