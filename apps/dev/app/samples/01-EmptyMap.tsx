import { ChoroplethMap, ProvinceData } from "react-iran-maps";

export function EmptyMapSample() {
  const emptyData: ProvinceData[] = [];

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ۱. نقشه پایه (بدون داده)
      </h2>
      <p className="text-gray-600 mb-4">
        نقشه خالی بدون هیچ داده‌ای - همه استان‌ها سفید هستند
      </p>
      <div className="border border-gray-200 rounded-lg p-4">
        <ChoroplethMap data={emptyData} />
      </div>
    </section>
  );
}

