import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function EnglishNamesSample() {
  const englishData: ProvinceData[] = [
    { name: "Tehran", value: 15000000 },
    { name: "Isfahan", value: 5500000 },
    { name: "Khorasan Razavi", value: 6500000 },
    { name: "Fars", value: 4800000 },
    { name: "Khuzestan", value: 4700000 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۱۲. نام استان‌ها به انگلیسی
      </h2>
      <p className="text-gray-600 mb-4">نقشه با نام استان‌ها به انگلیسی</p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={englishData}
          legend={{
            mode: "quantitative",
            colors: ["#F3E8FF", "#E9D5FF", "#D8B4FE", "#C084FC", "#A855F7"],
          }}
        />
      </div>
    </section>
  );
}

