import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function ZeroValuesSample() {
  const zeroValuesData: ProvinceData[] = [
    { name: "تهران", value: 15000000 },
    { name: "اصفهان", value: 0 },
    { name: "خراسان رضوی", value: 6500000 },
    { name: "فارس", value: 0 },
    { name: "خوزستان", value: 4700000 },
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۱۴. مقادیر صفر
      </h2>
      <p className="text-gray-600 mb-4">
        استان‌هایی با مقدار صفر (سفید نمایش داده می‌شوند)
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap
          data={zeroValuesData}
          legend={{
            mode: "quantitative",
            colors: ["#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9"],
          }}
        />
      </div>
    </section>
  );
}

