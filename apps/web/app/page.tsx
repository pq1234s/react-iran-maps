"use client";

import { Map, ProvinceData } from "react-iran-maps";
import styles from "./page.module.css";

// Example data with provinces and counties
const mapData: ProvinceData[] = [
  {
    name: "تهران",
    count: 71885,
    counties: [
      { name: "اسلامشهر", count: 1583 },
      { name: "شهرری", count: 2730 },
      { name: "دماوند", count: 641 },
    ],
  },
  {
    name: "البرز",
    count: 9574,
    counties: [
      { name: "فردیس", count: 5 },
      { name: "اشتهارد", count: 98 },
    ],
  },
];

console.log("mapData", mapData);

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
          <Map
            data={mapData}
            isolateProvince={true}
            colorScale={["#E0F2FE", "#0369A1"]}
          />
        </div>
      </main>
    </div>
  );
}
