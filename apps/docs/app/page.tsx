"use client";

import styles from "./page.module.css";
import { Map } from "react-iran-maps";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Map
          showLegend={true}
          legendTitle="Value"
          data={[
            { name: "Tehran", value: 100 },
            { name: "Isfahan", value: 200 },
          ]}
          colorScale={["#E0F2FE", "#7DD3FC", "#0EA5E9", "#0369A1", "#1E3A8A"]}
        />
      </main>
    </div>
  );
}
