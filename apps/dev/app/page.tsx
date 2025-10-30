"use client";

import Link from "next/link";
import {
  EmptyMapSample,
  QuantitativeDefaultSample,
  QuantitativeCustomColorsSample,
  QualitativeDataSample,
  DrilldownQuantitativeSample,
  DrilldownQualitativeSample,
  DisabledTooltipSample,
} from "./samples";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              نمونه‌های پایه
            </h2>
            <p className="text-gray-600">
              سناریوهای اولیه و اساسی برای استفاده از ChoroplethMap
            </p>
          </div>

          <EmptyMapSample />
          <QuantitativeDefaultSample />
          <QuantitativeCustomColorsSample />
          <QualitativeDataSample />
          <DrilldownQuantitativeSample />
          <DrilldownQualitativeSample />
          <DisabledTooltipSample />

          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              برای مشاهده نمونه‌های پیشرفته به صفحه بعد بروید
            </p>
            <Link
              href="/advanced"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              نمونه‌های پیشرفته ←
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
