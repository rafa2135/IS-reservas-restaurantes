// app/restaurants/[id]/page.tsx
interface RestaurantPageProps {
  params: { id: string };
}

export default async function RestaurantPage(props: RestaurantPageProps) {
  const { id } = await props.params;

  return (
    <main className="p-5">
      <h1 className="text-xl font-bold">Restaurant ID: {id}</h1>
    </main>
  );
}
