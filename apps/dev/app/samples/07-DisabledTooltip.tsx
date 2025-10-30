import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function DisabledTooltipSample() {
  const quantitativeData: ProvinceData[] = [
    { name: "تهران", value: 15000000 },
    { name: "اصفهان", value: 5500000 },
    { name: "خراسان رضوی", value: 6500000 },
    { name: "فارس", value: 4800000 },
    { name: "خوزستان", value: 4700000 },
    { name: "آذربایجان شرقی", value: 3900000 },
    { name: "مازندران", value: 3200000 },
    { name: "آذربایجان غربی", value: 3200000 },
    { name: "کرمان", value: 3100000 },
    { name: "البرز", value: 2800000 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۷. نقشه بدون Tooltip
      </h2>
      <p className="text-gray-600 mb-4">
        نمایش نقشه با غیرفعال‌سازی tooltip
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={quantitativeData}
          disableTooltip={true}
          legend={{
            mode: "quantitative",
            colors: ["#FEE2E2", "#FCA5A5", "#F87171", "#EF4444", "#DC2626"],
          }}
        />
      </div>
    </section>
  );
}

