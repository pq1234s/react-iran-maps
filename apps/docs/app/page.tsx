"use client";

import styles from "./page.module.css";
import { Map } from "react-iran-maps";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Map
          data={[
            {
              name: "Tehran",
              count: 100,
              counties: [
                { name: "Tehran", count: 100 },
                { name: "Shiraz", count: 200 },
                { name: "Tabriz", count: 300 },
                { name: "Yazd", count: 400 },
                { name: "Esfahan", count: 500 },
                { name: "Mashhad", count: 600 },
                { name: "Qom", count: 700 },
                { name: "Kerman", count: 800 },
              ],
            },
            {
              name: "Isfahan",
              count: 200,
              counties: [
                { name: "Isfahan", count: 200 },
                { name: "Shiraz", count: 300 },
                { name: "Tabriz", count: 400 },
                { name: "Yazd", count: 500 },
                { name: "Esfahan", count: 600 },
                { name: "Mashhad", count: 700 },
                { name: "Qom", count: 800 },
                { name: "Kerman", count: 900 },
              ],
            },
            { name: "Shiraz", count: 300 },
            { name: "Tabriz", count: 400 },
            { name: "Yazd", count: 500 },
            { name: "Esfahan", count: 600 },
            { name: "Mashhad", count: 700 },
            { name: "Qom", count: 800 },
            { name: "Kerman", count: 900 },
          ]}
          colorScale={["#E0F2FE", "#7DD3FC", "#0EA5E9", "#0369A1", "#1E3A8A"]}
        />
      </main>
    </div>
  );
}
