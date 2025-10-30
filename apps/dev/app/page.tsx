import {
  EmptyMapSample,
  QuantitativeDefaultSample,
  QuantitativeCustomColorsSample,
  QualitativeDataSample,
  DrilldownQuantitativeSample,
  DrilldownQualitativeSample,
  DisabledTooltipSample,
  CustomTooltipSample,
  DifferentSizesSample,
  NoLegendSample,
  CustomAspectRatioSample,
  EnglishNamesSample,
  IncompleteDataSample,
  ZeroValuesSample,
} from "./samples";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          نمونه‌های تست ChoroplethMap
        </h1>

        <EmptyMapSample />
        <QuantitativeDefaultSample />
        <QuantitativeCustomColorsSample />
        <QualitativeDataSample />
        <DrilldownQuantitativeSample />
        <DrilldownQualitativeSample />
        <DisabledTooltipSample />
        <CustomTooltipSample />
        <DifferentSizesSample />
        <NoLegendSample />
        <CustomAspectRatioSample />
        <EnglishNamesSample />
        <IncompleteDataSample />
        <ZeroValuesSample />

        <footer className="text-center text-gray-600 py-8">
          <p>تمامی سناریوهای مختلف ChoroplethMap تست شده است</p>
        </footer>
      </div>
    </div>
  );
}
