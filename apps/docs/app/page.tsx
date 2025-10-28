"use client";

import styles from "./page.module.css";
import { ChoroplethMap } from "react-iran-maps";
import { mockProvinceData } from "./mockProvinceData";
import { mockCategoricalData } from "./mockCategoricalData";
import type { ProvinceMapItem } from "react-iran-maps";
import type { CountyFeature } from "react-iran-maps";

export default function Home() {
  // Custom tooltip content renderer
  const renderCustomTooltip = (
    provinceData?: ProvinceMapItem,
    geo?: CountyFeature
  ) => {
    const isCountiesView = !!geo?.properties?.cityName;
    const name = isCountiesView
      ? geo.properties.cityName
      : geo?.properties?.provincName;

    return `
      <div style="padding: 8px;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
          ${name || "نامشخص"}
        </div>
        ${
          provinceData?.value !== undefined
            ? `
          <div style="margin-top: 4px;">
            <span style="color: #666;">مقدار: </span>
            <span style="font-weight: bold; color: #1976d2;">
              ${Intl.NumberFormat("fa-IR").format(Number(provinceData.value) || 0)}
            </span>
          </div>
        `
            : ""
        }
        ${
          isCountiesView
            ? `
          <div style="font-size: 12px; color: #999; margin-top: 6px;">
            ⚡ منطقه شهرستانی
          </div>
        `
            : `
          <div style="font-size: 12px; color: #999; margin-top: 6px;">
            🗺️ استان
          </div>
        `
        }
      </div>
    `;
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexDirection: "column",
            padding: "20px",
            width: "100%",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
              لجند کمی (Quantitative Legend)
            </h2>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              داده‌های عددی با لجند گرادیان و tooltip سفارشی
            </p>
            <div
              style={{
                width: "30%",
                height: "500px",
                overflow: "hidden",
              }}
            >
              <ChoroplethMap
                width={400}
                height={400}
                scale={1100}
                aspectRatio="1.23"
                drilldown
                data={mockProvinceData}
                renderTooltipContent={renderCustomTooltip}
                legend={{
                  mode: "quantitative",
                  colors: [
                    "#FFEECB",
                    "#FFDFA0",
                    "#FFD47F",
                    "#FFC759",
                    "#FFB728",
                  ],
                }}
              />
            </div>
          </div>

          {/* Categorical Legend Example */}
          <div>
            <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
              لجند کیفی (Categorical Legend)
            </h2>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              داده‌های دسته‌بندی شده با لجند رنگی
            </p>
            <div
              style={{
                width: "100%",
                height: "500px",
                overflow: "hidden",
              }}
            >
              <ChoroplethMap
                width={800}
                height={600}
                aspectRatio="1.23"
                data={mockCategoricalData}
                disableTooltip
                legend={{
                  disable: false,
                  mode: "qualitative",
                  items: [
                    { value: "پایین", color: "#e8f5e9", label: "پایین" },
                    { value: "متوسط", color: "#81c784", label: "متوسط" },
                    { value: "بالا", color: "#2e7d32", label: "بالا" },
                  ],
                }}
              />
            </div>
          </div>

          {/* Auto-detect Example */}
          <div>
            <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
              تشخیص خودکار (Auto-detect)
            </h2>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              بدون تنظیمات دستی - تشخیص خودکار بر اساس داده
            </p>
            <div
              style={{
                width: "100%",
                height: "500px",
                overflow: "hidden",
              }}
            >
              <ChoroplethMap
                width={800}
                height={600}
                aspectRatio="1.23"
                data={mockCategoricalData}
                legend={{
                  mode: "quantitative",
                  colors: ["#ffebee", "#e57373", "#c62828"],
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
