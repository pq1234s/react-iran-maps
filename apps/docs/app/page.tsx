"use client";

import styles from "./page.module.css";
import { Map } from "react-iran-maps";
import { mockProvinceData } from "./mockProvinceData";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            maxWidth: "50%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Map
            width={800}
            height={600}
            aspectRatio="1.23"
            data={mockProvinceData}
          />
        </div>
      </main>
    </div>
  );
}
