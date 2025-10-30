import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function DrilldownQuantitativeSample() {
  const drilldownData: ProvinceData[] = [
    {
      name: "تهران",
      value: 15000000,
      counties: [
        { name: "تهران", value: 8500000 },
        { name: "شمیرانات", value: 400000 },
        { name: "ری", value: 1200000 },
        { name: "اسلامشهر", value: 500000 },
        { name: "شهریار", value: 900000 },
      ],
    },
    {
      name: "اصفهان",
      value: 5500000,
      counties: [
        { name: "اصفهان", value: 2200000 },
        { name: "نجف آباد", value: 280000 },
        { name: "خمینی شهر", value: 250000 },
        { name: "کاشان", value: 400000 },
      ],
    },
    {
      name: "فارس",
      value: 4800000,
      counties: [
        { name: "شیراز", value: 1900000 },
        { name: "مرودشت", value: 150000 },
        { name: "جهرم", value: 140000 },
        { name: "فسا", value: 110000 },
      ],
    },
    { name: "خراسان رضوی", value: 6500000 },
    { name: "خوزستان", value: 4700000 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۵. نقشه با قابلیت Drilldown (کمی)
      </h2>
      <p className="text-gray-600 mb-4">
        روی استان‌ها کلیک کنید تا شهرستان‌ها نمایش داده شود
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={drilldownData}
          drilldown={true}
          legend={{
            mode: "quantitative",
            colors: ["#E0F2F7", "#B3E5FC", "#81D4FA", "#29B6F6", "#0288D1"],
          }}
        />
      </div>
    </section>
  );
}

