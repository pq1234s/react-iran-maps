import React from "react";

export function Legend({ colorScale }: any) {
  const range = colorScale.range();

  const lastIndex = range.length - 1;
  const firstIndex = 0;

  const [min] = colorScale.invertExtent(range[firstIndex]);
  const [_, max] = colorScale.invertExtent(range[lastIndex]);

  if (!min && !max) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 12,
        fontSize: 12,
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {min && <div>کمترین: {Intl.NumberFormat().format(min)} مطلب</div>}
      <div
        style={{
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {range.map((color: string, index: number) => (
          <div
            key={index}
            style={{ width: 37, height: 13, backgroundColor: color }}
          />
        ))}
      </div>
      {max && <div>بیشترین: {Intl.NumberFormat().format(max)} مطلب</div>}
    </div>
  );
}
