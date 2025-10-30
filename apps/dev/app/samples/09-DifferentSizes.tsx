import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function DifferentSizesSample() {
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
        ۹. اندازه‌های مختلف
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">نقشه کوچک</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <ChoroplethMap
              data={quantitativeData}
              width={400}
              height={300}
              legend={{
                mode: "quantitative",
                colors: ["#DBEAFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB"],
              }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">نقشه بزرگ</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <ChoroplethMap
              data={quantitativeData}
              width={600}
              height={450}
              legend={{
                mode: "quantitative",
                colors: ["#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899"],
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

