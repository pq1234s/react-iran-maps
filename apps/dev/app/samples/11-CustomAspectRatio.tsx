"use client";

import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function CustomAspectRatioSample() {
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
        ۱۱. نسبت ابعاد سفارشی
      </h2>
      <p className="text-gray-600 mb-4">نقشه با نسبت ابعاد عریض‌تر</p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={quantitativeData}
          scale={1800}
          aspectRatio="4/2"
          legend={{
            mode: "quantitative",
            colors: ["#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B"],
          }}
        />
      </div>
    </section>
  );
}
