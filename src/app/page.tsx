"use client";
import React, { useState } from "react";
import Comensales from "./components/Comensales";
import DateSelector from "./components/DateSelector";
import HourSelector from "./components/HourSelector";
import Card from "./components/reusables/Card";

const temporal = [
  { id: "1", name: "Pasta", src: "/r1.png" },
  { id: "2", name: "Burger", src: "/r2.png" },
  { id: "3", name: "Sushi", src: "/r2.png" },
];
export default function Home() {
  const [cantidadComensales, setCantidadComensales] = useState(0);
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <div className="flex flex-row">
        <DateSelector />
        <HourSelector />
        <Comensales
          max={10}
          value={cantidadComensales}
          onChange={setCantidadComensales}
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-center">
        <Card
          src={temporal[0].src}
          name={temporal[0].name}
          id={temporal[0].id}
        />
        <Card
          src={temporal[1].src}
          name={temporal[1].name}
          id={temporal[1].id}
        />
        <Card
          src={temporal[2].src}
          name={temporal[2].name}
          id={temporal[2].id}
        />
      </div>
    </main>
  );
}
