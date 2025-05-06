"use client";
import React, { useState } from "react";
import Comensales from "./components/Comensales";
import DateSelector from "./components/DateSelector";
import HourSelector from "./components/HourSelector";
import Card from "./components/reusables/Card";
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
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <Card src="/r1.png" name="Restaurante 1" />
        <Card src="/r2.png" />
        <Card src="/r1.png" />
      </div>
    </main>
  );
}
