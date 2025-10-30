import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function DrilldownQualitativeSample() {
  const qualitativeDrilldownData: ProvinceData[] = [
    {
      name: "تهران",
      value: "بسیار بالا",
      counties: [
        { name: "تهران", value: "بسیار بالا" },
        { name: "شمیرانات", value: "بالا" },
        { name: "ری", value: "متوسط" },
        { name: "اسلامشهر", value: "بالا" },
      ],
    },
    {
      name: "اصفهان",
      value: "بالا",
      counties: [
        { name: "اصفهان", value: "بالا" },
        { name: "نجف آباد", value: "متوسط" },
        { name: "کاشان", value: "کم" },
      ],
    },
    { name: "فارس", value: "متوسط" },
    { name: "خراسان رضوی", value: "بالا" },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۶. Drilldown با داده‌های کیفی
      </h2>
      <p className="text-gray-600 mb-4">
        ترکیب قابلیت drilldown با داده‌های دسته‌بندی شده
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={qualitativeDrilldownData}
          drilldown={true}
          legend={{
            mode: "qualitative",
            items: [
              { label: "بسیار بالا", value: "بسیار بالا", color: "#7C3AED" },
              { label: "بالا", value: "بالا", color: "#A78BFA" },
              { label: "متوسط", value: "متوسط", color: "#C4B5FD" },
              { label: "کم", value: "کم", color: "#DDD6FE" },
            ],
          }}
        />
      </div>
    </section>
  );
}

