"use client";

import { ChoroplethMap, ProvinceData } from "react-iran-maps";
import styles from "./page.module.css";

// Example data with provinces and counties
const mapData: ProvinceData[] = [
  {
    name: "تهران",
    value: 71885,
    counties: [
      { name: "اسلامشهر", value: 1583 },
      { name: "شهرری", value: 2730 },
      { name: "دماوند", value: 641 },
    ],
  },
  {
    name: "البرز",
    value: 9574,
    counties: [
      { name: "فردیس", value: 5 },
      { name: "اشتهارد", value: 98 },
    ],
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ marginBottom: "20px" }}>Iran Map with Data Example</h1>
        <p style={{ marginBottom: "20px" }}>
          Click on a province to view its counties. The map is color-coded based
          on data values.
        </p>
        <div style={{ width: "100%", height: "600px" }}>
          <ChoroplethMap data={mapData} />
        </div>
      </main>
    </div>
  );
}
