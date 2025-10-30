import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function QuantitativeCustomColorsSample() {
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

  const customColorRange = [
    "#FEF5E7",
    "#F9E79F",
    "#F4D03F",
    "#F39C12",
    "#D68910",
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۳. داده‌های کمی با رنگ‌های سفارشی
      </h2>
      <p className="text-gray-600 mb-4">
        همان داده‌های جمعیت با پالت رنگی زرد-نارنجی سفارشی
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={quantitativeData}
          legend={{ mode: "quantitative", colors: customColorRange }}
        />
      </div>
    </section>
  );
}

