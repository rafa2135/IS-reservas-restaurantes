//Comensales.tsx
import React from "react";
import { Icon } from "@iconify/react";

interface ComensalesProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Comensales: React.FC<ComensalesProps> = ({ max, value, onChange }) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
        <Icon icon="mdi:account-group" width="20" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={0} disabled>
          0
        </option>
        {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Comensales;
