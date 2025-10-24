import React from "react";

export function Legend({ colorScale }: any) {
  const range = colorScale.range();

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginTop: 12,
        fontSize: 12,
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {range.map((color: string, i: number) => {
        const [min, max] = colorScale.invertExtent(color);

        return (
          <div key={i} style={{ textAlign: "center" }}>
            {/* رنگ بازه */}
            <div
              style={{
                width: 24,
                height: 14,
                backgroundColor: color,
                border: "1px solid #ccc",
              }}
            />

            {/* بازه مقداری */}
            <div style={{ width: 40 }}>
              {Math.round(min)} — {Math.round(max)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
