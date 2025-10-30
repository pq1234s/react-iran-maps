import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function IncompleteDataSample() {
  const incompleteData: ProvinceData[] = [
    { name: "تهران", value: 15000000 },
    { name: "اصفهان", value: 5500000 },
    { name: "فارس", value: 4800000 },
    // Other provinces don't have data
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۱۳. داده‌های ناقص
      </h2>
      <p className="text-gray-600 mb-4">
        برخی استان‌ها داده دارند، برخی ندارند (نواحی سفید)
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={incompleteData}
          legend={{
            mode: "quantitative",
            colors: ["#FFEDD5", "#FED7AA", "#FDBA74", "#FB923C", "#F97316"],
          }}
        />
      </div>
    </section>
  );
}

