"use client";

import styles from "./page.module.css";
import { ChoroplethMap } from "react-iran-maps";
import { mockProvinceData } from "./mockProvinceData";
import { mockCategoricalData } from "./mockCategoricalData";

export default function Home() {
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
              داده‌های عددی با لجند گرادیان
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
                data={mockProvinceData}
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
                  disable: true,
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
                colorScale={["#ffebee", "#e57373", "#c62828"]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
