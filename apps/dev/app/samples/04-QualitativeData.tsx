import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function QualitativeDataSample() {
  const qualitativeData: ProvinceData[] = [
    { name: "تهران", value: "بسیار بالا" },
    { name: "اصفهان", value: "بالا" },
    { name: "خراسان رضوی", value: "متوسط" },
    { name: "فارس", value: "بالا" },
    { name: "خوزستان", value: "متوسط" },
    { name: "آذربایجان شرقی", value: "کم" },
    { name: "مازندران", value: "بالا" },
    { name: "آذربایجان غربی", value: "کم" },
    { name: "کرمان", value: "متوسط" },
    { name: "البرز", value: "بسیار بالا" },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۴. داده‌های کیفی/دسته‌بندی
      </h2>
      <p className="text-gray-600 mb-4">
        نمایش سطح ریسک استان‌ها با داده‌های دسته‌ای
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={qualitativeData}
          legend={{
            mode: "qualitative",
            items: [
              { label: "بسیار بالا", value: "بسیار بالا", color: "#DC2626" },
              { label: "بالا", value: "بالا", color: "#F59E0B" },
              { label: "متوسط", value: "متوسط", color: "#FCD34D" },
              { label: "کم", value: "کم", color: "#10B981" },
            ],
          }}
        />
      </div>
    </section>
  );
}

