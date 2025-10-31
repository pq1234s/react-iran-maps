"use client";

import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function CustomTooltipSample() {
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

  const customTooltipContentRenderer = (provinceData?: {
    name: string;
    value?: string | number;
  }) => {
    const name = provinceData?.name || "نامشخص";
    const value = provinceData?.value || 0;
    return `
      <div style="padding: 10px; color: #000; border-radius: 8px;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${name}</div>
        <div style="color: #fbbf24;">جمعیت: ${typeof value === "number" ? Intl.NumberFormat("fa-IR").format(value) : value}</div>
      </div>
    `;
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۸. Tooltip سفارشی
      </h2>
      <p className="text-gray-600 mb-4">نقشه با tooltip سفارشی‌سازی شده</p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={quantitativeData}
          renderTooltipContent={customTooltipContentRenderer}
          legend={{
            mode: "quantitative",
            colors: ["#D1FAE5", "#6EE7B7", "#34D399", "#10B981", "#059669"],
          }}
        />
      </div>
    </section>
  );
}
