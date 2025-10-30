import { Tooltip as ReactTooltip } from "react-tooltip";

export function Tooltip() {
  return (
    <ReactTooltip
      id="tooltip"
      noArrow
      style={{
        zIndex: 1000,
        color: "black",
        backgroundColor: "white",
        border: "1px solid #8e8e8e",
        borderRadius: "6px",
        padding: "12px",
        textAlign: "right",
        direction: "ltr",
        boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.1)",
      }}
      data-tooltip-float={true}
      float={true}
    />
  );
}
