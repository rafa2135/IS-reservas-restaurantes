import React from "react";
//import { useParams } from 'next/navigation';

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params;

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold">Restaurant: {id}</h1>
      <p className="mt-2 text-lg">Details for restaurant with ID: {id}</p>
    </main>
  );
}
