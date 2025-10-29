import React from "react";

export function QuantitativeLegend({ scale }: any) {
  const range = scale.range();

  const lastIndex = range.length - 1;
  const firstIndex = 0;

  const [minRaw] = scale.invertExtent(range[firstIndex]);
  const [_, maxRaw] = scale.invertExtent(range[lastIndex]);

  const min = isFinite(minRaw) ? minRaw : "0";
  const max = isFinite(maxRaw) ? maxRaw : "0";

  if (!min && !max) {
    return null;
  }

  return (
    <div
      className="legend quantitative-legend"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        fontSize: 12,
      }}
    >
      {min && <div>کمترین: {Intl.NumberFormat("fa-IR").format(min)} مطلب</div>}
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
      {max && <div>بیشترین: {Intl.NumberFormat("fa-IR").format(max)} مطلب</div>}
    </div>
  );
}

export function QualitativeLegend({ scale }: any) {
  const range = scale.range();
  const items = scale.domain();

  return (
    <div
      className="legend qualitative-legend"
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: 12,
        fontWeight: 400,
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
