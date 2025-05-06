import Link from "next/link";

const mockRestaurants = [
  { id: "1", name: "Pasta" },
  { id: "2", name: "Burger" },
  { id: "3", name: "Sushi" },
];

export default function RestaurantsList() {
  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <ul className="space-y-2">
        {mockRestaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="text-blue-600 hover:underline"
            >
              {restaurant.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
