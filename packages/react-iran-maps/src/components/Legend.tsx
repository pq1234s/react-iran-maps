import React from "react";

export function QuantitativeLegend({ scale }: any) {
  const range = scale.range();

  const lastIndex = range.length - 1;
  const firstIndex = 0;

  const [min] = scale.invertExtent(range[firstIndex]);
  const [_, max] = scale.invertExtent(range[lastIndex]);

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

export function QualitativeLegend({ scale }: any) {
  const range = scale.range();
  const items = scale.domain();

  console.log("qualitative legend", range, items);
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        fontSize: 12,
        fontWeight: 400,
        position: "absolute",
        top: "500px",
        right: "20px",
        direction: "rtl",
      }}
    >
      {items.map((item: string, index: number) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          key={index}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: range[index],
              borderRadius: "50%",
            }}
          ></div>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
