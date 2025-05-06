"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [fecha, setFecha] = useState<Date | null>(null);

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        selected={fecha}
        onChange={(date) => setFecha(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="fecha"
        className="w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
  );
};

export default DateSelector;
